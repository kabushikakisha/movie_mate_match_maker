import { Link } from "react-router-dom";

const pages = [
    { label: "Enter Movie", to: "/movie", description: "Add a movie to the list" },
    { label: "Rate Movies", to: "/rate", description: "Rate movies you've seen" },
    { label: "Choose Movies", to: "/choose", description: "Pick what to watch together" },
];

export default function Home() {
    return (
        <div className="mx-auto mt-24 max-w-2xl px-4">
            <h1 className="mb-8 text-3xl font-bold text-white">Movie Mate Match Maker</h1>
            <div className="flex flex-col gap-4">
                {pages.map((page) => (
                    <Link
                        key={page.to}
                        to={page.to}
                        className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-5 transition-colors hover:border-sky-500 hover:bg-slate-700"
                    >
                        <div className="text-lg font-semibold text-white">{page.label}</div>
                        <div className="mt-1 text-sm text-slate-400">{page.description}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}