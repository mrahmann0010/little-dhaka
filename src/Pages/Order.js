import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { menuSections } from "../data/menu";
import { contact, hoursToday } from "../data/site";

const DELIVERY_FEE = 60;
const STORAGE_KEY = 'ld-order';

const dishes = menuSections.flatMap((section) => section.items.map((item) => ({ ...item, meal: section.id })));
const findDish = (name) => dishes.find((dish) => dish.name === name);
const taka = (amount) => `৳${amount.toLocaleString('en-IN')}`;

const readyTimes = [
    { value: 'asap', label: 'As soon as possible (about 30 min)', phrase: 'in about 30 minutes' },
    { value: '60', label: 'In 1 hour', phrase: 'in about an hour' },
    { value: '120', label: 'In 2 hours', phrase: 'in about two hours' },
];

// Cart shape: { [dishName]: quantity }
function cartReducer(cart, action) {
    switch (action.type) {
        case 'add':
            return { ...cart, [action.name]: (cart[action.name] || 0) + 1 };
        case 'remove': {
            const next = { ...cart };
            const qty = (next[action.name] || 0) - 1;
            if (qty > 0) next[action.name] = qty;
            else delete next[action.name];
            return next;
        }
        case 'clear':
            return {};
        default:
            return cart;
    }
}

// Browser storage can be missing or blocked, and saved dishes may no longer exist.
function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        return Object.fromEntries(
            Object.entries(saved).filter(([name, qty]) => findDish(name) && Number.isInteger(qty) && qty > 0)
        );
    } catch {
        return {};
    }
}


function Order() {
    const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);
    const [placed, setPlaced] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch {
            // Saving is a convenience only
        }
    }, [cart]);

    const lines = Object.entries(cart).map(([name, qty]) => ({ ...findDish(name), qty }));
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => sum + Number(line.price) * line.qty, 0);

    const placeOrder = (details) => {
        const fee = details.fulfilment === 'delivery' ? DELIVERY_FEE : 0;
        setPlaced({
            ...details,
            number: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
            lines,
            total: subtotal + fee,
        });
        dispatch({ type: 'clear' });
        window.scrollTo(0, 0);
    };

    if (placed) {
        return <Confirmation order={placed} onNewOrder={() => setPlaced(null)} />;
    }

    return (
        <main className={count > 0 ? 'pb-20 lg:pb-0' : ''}>
            <OrderHeader />

            <div className="page-x pb-20 md:pb-28">
                <div className="container-page grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <DishPicker cart={cart} dispatch={dispatch} />
                    <Basket lines={lines} count={count} subtotal={subtotal} dispatch={dispatch} onPlace={placeOrder} />
                </div>
            </div>

            {count > 0 && <MobileBasketBar count={count} subtotal={subtotal} />}
        </main>
    )
}

export default Order;


function OrderHeader () {
    const today = hoursToday();

    return (
        <section className="section pb-10 md:pb-12">
            <header className="container-page flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 rule">
                <div>
                    <p className="eyebrow">Pickup or delivery</p>
                    <h1 className="mt-4 text-display">Order from our kitchen</h1>
                    <p className="mt-4 lead max-w-prose">
                        Everything is cooked when you order, packed warm and ready for your table at home.
                    </p>
                </div>
                <div className="md:text-right">
                    <p className="text-caption text-ink-subtle">Kitchen open today</p>
                    <p className="text-lead text-accent tabular-nums">{today.time}</p>
                </div>
            </header>
        </section>
    )
}


function DishPicker ({ cart, dispatch }) {
    const [meal, setMeal] = useState('all');
    const filters = [{ id: 'all', title: 'Everything' }, ...menuSections];
    const visible = menuSections.filter(({ id }) => meal === 'all' || id === meal);

    return (
        <div className="lg:col-span-7">
            <div className="sticky top-0 z-20 -mx-gutter px-gutter lg:mx-0 lg:px-0 py-3 bg-surface/90 backdrop-blur">
                <ul aria-label="Filter dishes by meal" className="flex gap-2 overflow-x-auto">
                    {filters.map(({ id, title }) => (
                        <li key={id}>
                            <button
                                type="button"
                                aria-pressed={meal === id}
                                onClick={() => setMeal(id)}
                                className={`tab ${meal === id ? 'tab-active' : ''}`}
                            >
                                {title.replace(' Menu', '')}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {visible.map(({ id, title, hours, items }) => (
                <section key={id} aria-labelledby={`order-${id}`} className="mt-8">
                    <header className="flex items-baseline justify-between gap-4 pb-3 rule">
                        <h2 id={`order-${id}`} className="text-title font-medium">{title.replace(' Menu', '')}</h2>
                        <p className="text-caption text-accent tabular-nums">{hours}</p>
                    </header>

                    <ul>
                        {items.map((dish) => (
                            <li key={dish.name} className="flex gap-4 md:gap-5 py-5 rule-soft">
                                <img src={dish.img} alt={dish.name} loading="lazy" className="frame-round size-16 md:size-20" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-title font-medium">{dish.name}</h3>
                                        <span aria-hidden="true" className="leader" />
                                        <p className="text-title font-medium tabular-nums">{taka(Number(dish.price))}</p>
                                    </div>
                                    <p className="mt-1 text-note">{dish.description}</p>

                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                        <ul className="flex flex-wrap gap-2">
                                            {dish.tags.map((tag) => (
                                                <li key={tag} className="chip">{tag}</li>
                                            ))}
                                        </ul>
                                        {cart[dish.name]
                                            ? <Stepper name={dish.name} qty={cart[dish.name]} dispatch={dispatch} />
                                            : (
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch({ type: 'add', name: dish.name })}
                                                    className="btn-outline py-1.5"
                                                    aria-label={`Add ${dish.name}`}
                                                >
                                                    <PlusIcon />
                                                    Add
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}


function Stepper ({ name, qty, dispatch }) {
    const stepClass = "grid size-9 place-items-center rounded-full text-ink-muted transition-colors duration-200 ease-soft hover:bg-ink/5 hover:text-ink";

    return (
        <div className="inline-flex items-center rounded-full border border-line-strong">
            <button type="button" onClick={() => dispatch({ type: 'remove', name })} className={stepClass} aria-label={`Remove one ${name}`}>
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                </svg>
            </button>
            <span className="min-w-6 text-center font-medium tabular-nums" aria-live="polite" aria-label={`${qty} ${name} in your order`}>{qty}</span>
            <button type="button" onClick={() => dispatch({ type: 'add', name })} className={stepClass} aria-label={`Add one more ${name}`}>
                <PlusIcon />
            </button>
        </div>
    )
}


function Basket ({ lines, count, subtotal, dispatch, onPlace }) {
    const [fulfilment, setFulfilment] = useState('pickup');
    const fee = fulfilment === 'delivery' ? DELIVERY_FEE : 0;
    const isEmpty = count === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        onPlace({
            fulfilment,
            name: form.get('name'),
            phone: form.get('phone'),
            address: form.get('address'),
            when: readyTimes.find(({ value }) => value === form.get('when')),
            notes: form.get('notes'),
        });
    };

    return (
        <aside id="basket" aria-labelledby="basket-title" className="lg:col-span-5 lg:sticky lg:top-6 scroll-mt-6">
            <div className="rounded-3xl border border-line p-6 md:p-8">
                <header className="flex items-baseline justify-between gap-4 pb-4 rule">
                    <h2 id="basket-title" className="text-heading">Your order</h2>
                    <p className="text-caption text-ink-subtle">{count} {count === 1 ? 'item' : 'items'}</p>
                </header>

                {isEmpty ? (
                    <div className="py-10 text-center">
                        <svg viewBox="0 0 24 28" className="mx-auto h-12 w-10 text-line-strong" aria-hidden="true">
                            <path d="M2 27V12C2 6 6.5 1.5 12 1.5S22 6 22 12v15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7 27v-13a5 5 0 0 1 10 0v13" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <p className="mt-4 text-note max-w-xs mx-auto">
                            Your basket is empty. Add a few dishes from the menu to get started.
                        </p>
                    </div>
                ) : (
                    <ul>
                        {lines.map((line) => (
                            <li key={line.name} className="flex items-center gap-3 py-4 rule-soft">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{line.name}</p>
                                    <p className="text-caption text-ink-subtle tabular-nums">{taka(Number(line.price))} each</p>
                                </div>
                                <Stepper name={line.name} qty={line.qty} dispatch={dispatch} />
                                <p className="w-20 text-right font-medium tabular-nums">{taka(Number(line.price) * line.qty)}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                    <fieldset>
                        <legend className="field-label">How would you like it?</legend>
                        <div className="flex gap-2">
                            {[['pickup', 'Pickup'], ['delivery', 'Delivery']].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    aria-pressed={fulfilment === value}
                                    onClick={() => setFulfilment(value)}
                                    className={`tab border ${fulfilment === value ? 'tab-active border-brand' : 'border-line'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-caption text-ink-subtle">
                            {fulfilment === 'pickup'
                                ? `Collect from ${contact.address}.`
                                : `Delivered warm for a ${taka(DELIVERY_FEE)} fee.`}
                        </p>
                    </fieldset>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                        <label className="block">
                            <span className="field-label">Name</span>
                            <input name="name" required autoComplete="name" className="field" />
                        </label>
                        <label className="block">
                            <span className="field-label">Phone</span>
                            <input name="phone" type="tel" required autoComplete="tel" placeholder="01XXX XXXXXX" className="field" />
                        </label>
                    </div>

                    {fulfilment === 'delivery' && (
                        <label className="block">
                            <span className="field-label">Delivery address</span>
                            <textarea name="address" required rows="2" autoComplete="street-address" className="field resize-none" />
                        </label>
                    )}

                    <label className="block">
                        <span className="field-label">{fulfilment === 'pickup' ? 'Ready for pickup' : 'Deliver'}</span>
                        <select name="when" className="field">
                            {readyTimes.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="field-label">Notes for the kitchen <span className="text-ink-subtle">(optional)</span></span>
                        <textarea name="notes" rows="2" placeholder="Less spice, no onions, extra raita…" className="field resize-none" />
                    </label>

                    <dl className="pt-4 rule-top flex flex-col gap-2 tabular-nums">
                        <div className="flex justify-between text-ink-muted">
                            <dt>Subtotal</dt>
                            <dd>{taka(subtotal)}</dd>
                        </div>
                        <div className="flex justify-between text-ink-muted">
                            <dt>{fulfilment === 'pickup' ? 'Pickup' : 'Delivery'}</dt>
                            <dd>{fee ? taka(fee) : 'Free'}</dd>
                        </div>
                        <div className="flex justify-between pt-2 text-title font-medium">
                            <dt>Total</dt>
                            <dd>{taka(subtotal + fee)}</dd>
                        </div>
                    </dl>

                    <button type="submit" disabled={isEmpty} className="btn-primary btn-lg w-full">
                        {isEmpty ? 'Add a dish to order' : `Place order · ${taka(subtotal + fee)}`}
                    </button>
                    <p className="-mt-2 text-center text-caption text-ink-subtle">
                        Pay with cash or bKash when you {fulfilment === 'pickup' ? 'collect' : 'receive your order'}.
                    </p>
                </form>
            </div>
        </aside>
    )
}


function MobileBasketBar ({ count, subtotal }) {
    return (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 page-x pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-surface/90 backdrop-blur border-t border-line-faint">
            <button
                type="button"
                onClick={() => document.getElementById('basket')?.scrollIntoView()}
                className="btn-primary btn-lg w-full justify-between"
            >
                <span>View order · {count} {count === 1 ? 'item' : 'items'}</span>
                <span className="tabular-nums">{taka(subtotal)}</span>
            </button>
        </div>
    )
}


function Confirmation ({ order, onNewOrder }) {
    const isPickup = order.fulfilment === 'pickup';

    return (
        <main>
            <section className="section md:py-24">
                <div className="container-page max-w-2xl text-center">
                    <p lang="bn" aria-hidden="true" className="font-bengali text-heading text-accent motion-safe:animate-rise">ধন্যবাদ</p>
                    <h1 className="mt-2 text-display motion-safe:animate-rise" style={{ animationDelay: '90ms' }}>
                        Thank you, {order.name.split(' ')[0]}
                    </h1>
                    <p className="mt-6 lead max-w-prose mx-auto motion-safe:animate-rise" style={{ animationDelay: '180ms' }}>
                        {isPickup
                            ? `Your order will be ready at ${contact.address} ${order.when.phrase}.`
                            : `Your order will reach you ${order.when.phrase}.`}
                        {' '}We'll call {order.phone} if anything changes.
                    </p>

                    <div className="mt-12 rounded-3xl border border-line p-6 md:p-8 text-left motion-safe:animate-rise" style={{ animationDelay: '270ms' }}>
                        <dl className="grid grid-cols-2 gap-4 pb-5 rule">
                            <div>
                                <dt className="text-caption text-ink-subtle">Order number</dt>
                                <dd className="text-title font-medium tabular-nums">{order.number}</dd>
                            </div>
                            <div className="text-right">
                                <dt className="text-caption text-ink-subtle">{isPickup ? 'Pay on pickup' : 'Pay on delivery'}</dt>
                                <dd className="text-title font-medium tabular-nums">{taka(order.total)}</dd>
                            </div>
                        </dl>
                        <ul>
                            {order.lines.map((line) => (
                                <li key={line.name} className="flex items-baseline gap-3 py-3 rule-soft">
                                    <span className="tabular-nums text-ink-subtle">{line.qty}×</span>
                                    <span>{line.name}</span>
                                    <span aria-hidden="true" className="leader" />
                                    <span className="tabular-nums">{taka(Number(line.price) * line.qty)}</span>
                                </li>
                            ))}
                        </ul>
                        {order.notes && <p className="mt-4 text-note">“{order.notes}”</p>}
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <button type="button" onClick={onNewOrder} className="btn-primary btn-lg">Start a new order</button>
                        <Link to="/" className="btn-outline btn-lg">Back to home</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}


function PlusIcon () {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
    )
}
