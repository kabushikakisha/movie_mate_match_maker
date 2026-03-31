import {Link} from "react-router-dom";

type NavItem = {
    label: string;
    to: string;
};

type NavBarProps = {
    items: NavItem[];
};

export default function NavBar({items}: NavBarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700/70 bg-slate-900/95 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="text-lg font-bold tracking-wide text-white">
                    Movie Mate Match Maker
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {items.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}