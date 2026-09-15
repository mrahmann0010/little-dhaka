import { useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { BookTableButton } from "./Booking";

const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/order', label: 'Order' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const linkClass = ({isActive}) =>
        `link-underline ${isActive ? 'link-underline-active' : 'text-ink-muted'}`;

    return (
        <header className="bg-surface border-b border-line-faint">
            <nav className="page-x flex items-center justify-between gap-4 py-4">
                <Link to="/" className="flex items-center gap-2 text-wordmark">
                    <svg viewBox="0 0 24 28" className="h-7 w-6 text-brand" aria-hidden="true">
                        <path d="M2 27V12C2 6 6.5 1.5 12 1.5S22 6 22 12v15" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M7 27v-13a5 5 0 0 1 10 0v13" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="text-ink">Little Dhaka</span>
                </Link>

                <ul className="hidden md:flex gap-8 text-title">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} end className={linkClass}>{label}</NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <BookTableButton className="hidden sm:inline-flex" />
                    <button
                        type="button"
                        className="md:hidden p-2 -mr-2"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            {open
                                ? <path d="M6 6l12 12M18 6L6 18" />
                                : <path d="M4 8h16M4 16h16" />}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <ul className="page-x md:hidden flex flex-col gap-4 pb-6 text-title">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} end className={linkClass} onClick={() => setOpen(false)}>{label}</NavLink>
                        </li>
                    ))}
                    <li className="sm:hidden">
                        <BookTableButton className="w-full" onClick={() => setOpen(false)} />
                    </li>
                </ul>
            )}
        </header>
    )
};
