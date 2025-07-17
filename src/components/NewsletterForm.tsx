import React, { useState } from "react";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function NewsletterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const validate = () => {
        const newErrors: { name?: string; email?: string } = {};
        if (name.length < 5 || name.length > 40) {
            newErrors.name = "A névnek 5 és 40 karakter között kell lennie.";
        }
        if (!validateEmail(email)) {
            newErrors.email = "Érvényes email címet adj meg.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        if (!validate()) return;

        try {
            const res = await fetch(`${process.env.API_BASE_URL}/newsletter-subscribers/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                // hibakezelés pl.
                setErrors({ email: errorData.error || "Hiba történt" });
                return;
            }

            setSuccessMessage("Sikeres feliratkozás!");
            setName("");
            setEmail("");
            setErrors({});
        } catch {
            setErrors({ email: "Nem sikerült kapcsolatot létesíteni a szerverrel." });
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded shadow-md font-sans"
        >
            <h2 className="text-2xl font-semibold mb-6 text-center">Hírlevél feliratkozás</h2>

            <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium">
                    Név:
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3 py-2 border rounded ${
                        errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 border rounded ${
                        errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Feliratkozás
            </button>

            {successMessage && (
                <p className="mt-4 text-green-600 text-center font-medium">{successMessage}</p>
            )}
        </form>
    );
}
