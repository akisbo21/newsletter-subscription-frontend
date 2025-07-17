import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
                Hello
            </h1>
            <button
                onClick={() => router.push("/newsletter-subscription")}
                className="px-7 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Feliratkozás a hírlevélre"
            >
                Itt tudsz feliratkozni a hírlevélre
            </button>
        </div>
    );
}
