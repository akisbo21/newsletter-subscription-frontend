import React, { useEffect, useState } from "react";

type Subscriber = {
    id: number;
    name: string;
    email: string;
    subscribed_at: string;
};

export default function NewsletterSubscribersList() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/newsletter-subscribers/list`);
            if (!res.ok) throw new Error("Hiba a lista lekérésénél");
            const data: Subscriber[] = await res.json();
            setSubscribers(data);
            setError(null);
        } catch (e: any) {
            setError(e.message || "Ismeretlen hiba");
        }
    };

    const fetchCount = async () => {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/newsletter-subscribers/count`);
            if (!res.ok) throw new Error("Hiba a feliratkozók számának lekérésénél");
            const data = await res.json();
            setCount(data.count ?? 0);
        } catch {
            setCount(0);
        }
    };

    useEffect(() => {
        fetchSubscribers();
        fetchCount();
        const interval = setInterval(() => {
            fetchSubscribers();
            fetchCount();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-xs p-4 border rounded shadow-md overflow-auto" style={{ maxHeight: "400px" }}>
            <h3 className="text-lg font-semibold mb-1">Feliratkozók listája</h3>
            <div className="text-sm mb-4">Feliratkozók száma: {count}</div>

            {error && <div className="text-red-500 mb-2">{error}</div>}
            {subscribers.length === 0 && !error && <div>Nincs feliratkozó</div>}
            <ul className="text-sm">
                {subscribers.map((sub) => (
                    <li key={sub.id} className="mb-2 border-b border-gray-200 pb-2">
                        <div><strong>{sub.name}</strong></div>
                        <div className="text-gray-600">{sub.email}</div>
                        <div className="text-gray-500 text-xs">{new Date(sub.subscribed_at).toLocaleString()}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
