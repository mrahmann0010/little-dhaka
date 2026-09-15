import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { contact, hours } from "../data/site";

const BookingContext = createContext(() => {});

export const useBooking = () => useContext(BookingContext);

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];
const DAYS_AHEAD = 14;
const SLOT_MINUTES = 30;
// Guests need notice today, and the last table sits an hour before closing
const LEAD_MINUTES = 60;
const LAST_SEATING = 60;

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = String(minutes % 60).padStart(2, '0');
    return `${h % 12 || 12}:${m} ${h < 12 ? 'am' : 'pm'}`;
};

const slotsFor = (day) => {
    const { opens, closes } = hours.find(({ weekdays }) => weekdays.includes(day.getDay()));
    const now = new Date();
    const isToday = startOfDay(now).getTime() === day.getTime();
    const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES : 0;

    const slots = [];
    for (let t = opens; t <= closes - LAST_SEATING; t += SLOT_MINUTES) {
        if (t >= earliest) slots.push(t);
    }
    return slots;
};

const upcomingDays = () => {
    const today = startOfDay(new Date());
    return Array.from({ length: DAYS_AHEAD }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + i))
        .filter((day) => slotsFor(day).length > 0);
};


export function BookingProvider ({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <BookingContext.Provider value={() => setOpen(true)}>
            {children}
            <BookingDialog open={open} onClose={() => setOpen(false)} />
        </BookingContext.Provider>
    )
}


export function BookTableButton ({ variant = 'primary', size, className = '', onClick, children = 'Book a Table' }) {
    const openBooking = useBooking();

    return (
        <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => { onClick?.(); openBooking(); }}
            className={`group btn-${variant} ${size ? `btn-${size}` : ''} ${className}`}
        >
            {children}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 transition-transform duration-300 ease-soft group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">
                <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
                <path d="M3 8.5h14M7 2.5v3M13 2.5v3" strokeLinecap="round" />
                <circle cx="10" cy="12.75" r="1.25" fill="currentColor" stroke="none" className="origin-center transition-transform duration-300 ease-soft group-hover:scale-125" />
            </svg>
        </button>
    )
}


function BookingDialog ({ open, onClose }) {
    const dialogRef = useRef(null);
    const days = useMemo(upcomingDays, [open]);

    const [party, setParty] = useState(2);
    const [dayIndex, setDayIndex] = useState(0);
    const [time, setTime] = useState(null);
    const [booked, setBooked] = useState(null);

    const day = days[dayIndex] ?? days[0];
    const slots = useMemo(() => (day ? slotsFor(day) : []), [day]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open && !dialog.open) {
            setBooked(null);
            setTime(null);
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // Clear the time if it isn't offered on the newly picked day
    useEffect(() => {
        if (time !== null && !slots.includes(time)) setTime(null);
    }, [slots, time]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (time === null) return;
        const form = new FormData(event.currentTarget);
        setBooked({
            party,
            day,
            time,
            name: form.get('name'),
            phone: form.get('phone'),
            reference: `LD-T${Math.floor(1000 + Math.random() * 9000)}`,
        });
        event.currentTarget.reset();
    };

    const dayLabel = (date, style = 'short') =>
        date.toLocaleDateString('en-GB', { weekday: style, day: 'numeric', month: style });

    const isLargeGroup = party >= 8;

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
            aria-labelledby="booking-title"
            className="booking-dialog"
        >
            <div className="relative bg-surface text-ink rounded-t-[2rem] sm:rounded-3xl max-h-[92dvh] overflow-y-auto overscroll-contain">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
                >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                {booked ? (
                    <Confirmation booking={booked} dayLabel={dayLabel} onClose={onClose} />
                ) : (
                    <form onSubmit={handleSubmit} className="px-6 pb-6 pt-10 sm:px-10 sm:pb-10">
                        <header className="text-center">
                            <svg viewBox="0 0 24 28" className="mx-auto h-9 w-8 text-accent" aria-hidden="true">
                                <path d="M2 27V12C2 6 6.5 1.5 12 1.5S22 6 22 12v15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7 27v-13a5 5 0 0 1 10 0v13" fill="none" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <h2 id="booking-title" className="mt-4 text-heading">Reserve your table</h2>
                            <p className="mt-2 text-note">On {contact.address}. We hold tables for 15 minutes.</p>
                        </header>

                        <fieldset className="mt-8">
                            <legend className="field-label">Guests</legend>
                            <div className="flex flex-wrap gap-2">
                                {PARTY_SIZES.map((size) => (
                                    <Choice key={size} name="party" checked={party === size} onChange={() => setParty(size)} className="min-w-11 justify-center">
                                        {size === 8 ? '8+' : size}
                                    </Choice>
                                ))}
                            </div>
                            {isLargeGroup && (
                                <p className="mt-2 text-caption text-accent">
                                    For larger groups, we'll call to arrange seating a day ahead.
                                </p>
                            )}
                        </fieldset>

                        <fieldset className="mt-6">
                            <legend className="field-label">Date</legend>
                            <div className="-mx-6 px-6 sm:-mx-10 sm:px-10 flex gap-2 overflow-x-auto pb-2 snap-x scroll-px-6">
                                {days.map((date, index) => (
                                    <Choice
                                        key={date.getTime()}
                                        name="day"
                                        checked={index === dayIndex}
                                        onChange={() => setDayIndex(index)}
                                        className="snap-start shrink-0 flex-col !rounded-2xl !px-3 !py-2 w-16 text-center leading-tight"
                                        label={dayLabel(date, 'long')}
                                    >
                                        <span className="text-tag uppercase tracking-wider opacity-75">
                                            {index === 0 ? 'Today' : date.toLocaleDateString('en-GB', { weekday: 'short' })}
                                        </span>
                                        <span className="text-title font-medium tabular-nums">{date.getDate()}</span>
                                        <span className="text-tag opacity-75">{date.toLocaleDateString('en-GB', { month: 'short' })}</span>
                                    </Choice>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="mt-4">
                            <legend className="field-label">Time</legend>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {slots.map((slot) => (
                                    <Choice key={slot} name="time" checked={time === slot} onChange={() => setTime(slot)} required className="justify-center tabular-nums">
                                        {formatTime(slot)}
                                    </Choice>
                                ))}
                            </div>
                        </fieldset>

                        <div className="mt-6 pt-6 rule-top grid sm:grid-cols-2 gap-5">
                            <label className="block">
                                <span className="field-label">Name</span>
                                <input name="name" required autoComplete="name" className="field" />
                            </label>
                            <label className="block">
                                <span className="field-label">Phone</span>
                                <input name="phone" type="tel" required autoComplete="tel" placeholder="01XXX XXXXXX" className="field" />
                            </label>
                            <label className="block sm:col-span-2">
                                <span className="field-label">Occasion or requests <span className="text-ink-subtle">(optional)</span></span>
                                <textarea name="notes" rows="2" placeholder="A birthday, a high chair, a quiet corner…" className="field resize-none" />
                            </label>
                        </div>

                        <div className="sticky -bottom-6 sm:-bottom-10 -mx-6 sm:-mx-10 mt-6 px-6 sm:px-10 py-4 bg-surface/95 backdrop-blur border-t border-line-faint flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                            <p className="text-caption text-ink-muted" aria-live="polite">
                                {time === null
                                    ? 'Pick a time to continue'
                                    : <>{party === 8 ? '8+' : party} {party === 1 ? 'guest' : 'guests'} · {day && dayLabel(day)} · <span className="tabular-nums">{formatTime(time)}</span></>}
                            </p>
                            <button type="submit" disabled={time === null} className="btn-primary btn-lg">
                                Confirm booking
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </dialog>
    )
}


function Choice ({ name, checked, onChange, required, label, className = '', children }) {
    return (
        <label className={`tab border cursor-pointer inline-flex items-center has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${checked ? 'tab-active border-brand' : 'border-line hover:border-line-strong'} ${className}`}>
            <input type="radio" name={name} checked={checked} onChange={onChange} required={required} aria-label={label} className="sr-only" />
            {children}
        </label>
    )
}


function Confirmation ({ booking, dayLabel, onClose }) {
    return (
        <div className="px-6 pb-10 pt-12 sm:px-10 text-center motion-safe:animate-rise">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-white">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h2 id="booking-title" className="mt-6 text-heading">See you soon, {booking.name.split(' ')[0]}</h2>
            <p className="mt-2 text-note">We'll text a confirmation to {booking.phone}.</p>

            <dl className="mt-8 mx-auto max-w-sm rounded-arch border border-line px-6 pt-14 pb-6 grid grid-cols-3 gap-4">
                <div>
                    <dt className="text-caption text-ink-subtle">Guests</dt>
                    <dd className="text-title font-medium tabular-nums">{booking.party === 8 ? '8+' : booking.party}</dd>
                </div>
                <div>
                    <dt className="text-caption text-ink-subtle">Date</dt>
                    <dd className="text-title font-medium">{dayLabel(booking.day)}</dd>
                </div>
                <div>
                    <dt className="text-caption text-ink-subtle">Time</dt>
                    <dd className="text-title font-medium tabular-nums">{formatTime(booking.time)}</dd>
                </div>
                <div className="col-span-3 pt-4 rule-top">
                    <dt className="text-caption text-ink-subtle">Reference</dt>
                    <dd className="text-accent tabular-nums tracking-wider">{booking.reference}</dd>
                </div>
            </dl>

            <p className="mt-6 text-caption text-ink-subtle">
                Need to change it? Call <a href={`tel:${contact.tel}`} className="link-quiet text-ink tabular-nums">{contact.phone}</a>
            </p>
            <button type="button" onClick={onClose} className="mt-8 btn-outline btn-lg">Done</button>
        </div>
    )
}
