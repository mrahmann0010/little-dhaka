import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReserveBand from "../Components/ReserveBand";
import { BookTableButton } from "../Components/Booking";
import { menuSections } from "../data/menu";
import { contact, hoursToday } from "../data/site";

const heroSlides = [
    { src: '/f6.webp', caption: 'Jhal muri, tossed to order' },
    { src: '/f1.jpg', caption: 'Bought at the morning market' },
    { src: '/f3.jpg', caption: 'The long Friday lunch' },
];

const streetFood = ['Kacchi biryani', 'Fuchka', 'Shorshe ilish', 'Chotpoti', 'Bhuna khichuri', 'Mishti doi'];

const signatureNames = ['Bhuna Khichuri', 'Butter Chicken', 'Spicy Lamb Kebab', 'Kacchi Biryani'];

const signatures = menuSections
    .flatMap((section) => section.items.map((item) => ({ ...item, meal: section.title.replace(' Menu', '') })))
    .filter(({ name }) => signatureNames.includes(name));

// Bengali words for each part of the day, shown above the meal names
const mealWords = { breakfast: 'সকাল', lunch: 'দুপুর', dinner: 'রাত' };

const riseDelay = (step) => ({ animationDelay: `${step * 90}ms` });

function Home() {
    return (
        <main>
            <Hero />
            <StreetFoodStrip />
            <Story />
            <Signatures />
            <ThroughTheDay />
            <GuestQuote />
            <ReserveBand />
        </main>
    )
}

export default Home;


function Hero () {
    const [slide, setSlide] = useState(0);
    const today = hoursToday();

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const timer = setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="page-x pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
            <div className="container-page grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
                <div className="lg:col-span-7">
                    <p className="flex items-center gap-3 text-lead text-accent motion-safe:animate-rise" style={riseDelay(0)}>
                        <span lang="bn" className="font-bengali">স্বাগতম</span>
                        <span aria-hidden="true" className="h-px w-10 bg-current" />
                        <span className="italic font-light">welcome to the table</span>
                    </p>

                    <h1 className="mt-6 text-hero motion-safe:animate-rise" style={riseDelay(1)}>
                        Old Dhaka, <br className="hidden sm:block" />
                        cooked slow <br className="hidden sm:block" />
                        and served warm.
                    </h1>

                    <p className="mt-8 lead max-w-prose motion-safe:animate-rise" style={riseDelay(2)}>
                        Parathas at dawn, kacchi biryani at dusk, and a pot of dal that never quite leaves the stove. Home-style Bangladeshi cooking on {contact.address}.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3 motion-safe:animate-rise" style={riseDelay(3)}>
                        <Link to="/menu" className="btn-primary btn-lg">
                            Explore the Menu
                            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.64L10.2 5.28a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.19-3.97H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <BookTableButton variant="outline" size="lg" />
                    </div>

                    <dl className="mt-12 pt-6 rule-top grid grid-cols-1 sm:grid-cols-3 gap-5 motion-safe:animate-rise" style={riseDelay(4)}>
                        <div>
                            <dt className="text-caption text-ink-subtle">Open today</dt>
                            <dd className="mt-1 text-accent tabular-nums">{today.time}</dd>
                        </div>
                        <div>
                            <dt className="text-caption text-ink-subtle">Find us</dt>
                            <dd className="mt-1">{contact.address}</dd>
                        </div>
                        <div>
                            <dt className="text-caption text-ink-subtle">Call ahead</dt>
                            <dd className="mt-1"><a href={`tel:${contact.tel}`} className="link-quiet text-ink tabular-nums">{contact.phone}</a></dd>
                        </div>
                    </dl>
                </div>

                <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none motion-safe:animate-rise" style={riseDelay(2)}>
                    {/* Second arch offset behind the photo, echoing the double arch in the logo */}
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 aspect-[4/5] translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 rounded-arch border border-line" />

                    <figure className="relative">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-arch bg-surface-inverse">
                            {heroSlides.map(({ src }, index) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt=""
                                    className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-soft ${index === slide ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                        <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-caption text-ink-subtle">
                            <span className="italic">{heroSlides[slide].caption}</span>
                            <span className="tabular-nums" aria-hidden="true">0{slide + 1} / 0{heroSlides.length}</span>
                        </figcaption>
                    </figure>

                    <Seal className="absolute -left-4 bottom-20 md:-left-12 size-28 md:size-36" />
                </div>
            </div>
        </section>
    )
}


function Seal ({ className }) {
    return (
        <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Home-style Bangladeshi kitchen">
            <circle cx="60" cy="60" r="58" className="fill-surface-inverse" />
            <circle cx="60" cy="60" r="34" fill="none" strokeDasharray="1 3" className="stroke-ink-inverse-subtle" />
            <path id="seal-ring" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" fill="none" />
            <text className="fill-ink-inverse-muted font-serif italic" fontSize="10.5" aria-hidden="true">
                <textPath href="#seal-ring" textLength="280" lengthAdjust="spacing">
                    Home-style · Bangladeshi kitchen · Park Street ·
                </textPath>
            </text>
            <text x="60" y="70" textAnchor="middle" fontSize="28" lang="bn" className="fill-accent font-bengali" aria-hidden="true">ঢাকা</text>
        </svg>
    )
}


function StreetFoodStrip () {
    return (
        <div className="page-x py-5 bg-surface-inverse text-ink-inverse-muted">
            <ul className="container-page flex flex-wrap justify-center gap-x-5 gap-y-2 italic font-light text-lead">
                {streetFood.map((dish, index) => (
                    <li key={dish} className="flex items-center gap-5">
                        {index > 0 && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
                        {dish}
                    </li>
                ))}
            </ul>
        </div>
    )
}


function Story () {
    return (
        <section className="section md:py-24">
            <div className="container-page grid md:grid-cols-12 gap-12 md:gap-16 items-center">
                <div className="md:col-span-5 order-last md:order-first">
                    <div className="relative mx-auto max-w-sm aspect-[4/5] rounded-arch border border-line flex items-center justify-center overflow-hidden">
                        <div aria-hidden="true" className="absolute inset-5 rounded-arch border border-dotted border-line-strong" />
                        <p lang="bn" aria-hidden="true" className="font-bengali text-hero text-ink/10 select-none">পুরান ঢাকা</p>
                        <p className="absolute bottom-8 inset-x-0 text-center text-note">Puran Dhaka, the old city</p>
                    </div>
                </div>

                <div className="md:col-span-7">
                    <p className="eyebrow">Our story</p>
                    <h2 className="mt-4 text-heading">Recipes carried from the narrow lanes of the old city</h2>
                    <p className="mt-6 lead max-w-prose">
                        Before there was a dining room, there was a family kitchen near Chawkbazar, where biryani was cooked in sealed pots and the whole street knew when it was ready.
                    </p>
                    <p className="mt-4 max-w-prose text-ink-muted">
                        We still grind our own spice blends, still let the dal simmer for hours, and still cook the kacchi the long way. Nothing here is fancy. It is simply the food we grew up with, made with patience.
                    </p>

                    <dl className="mt-10 pt-6 rule-top grid grid-cols-3 gap-6">
                        {[
                            ['20+', 'spices ground in-house'],
                            ['6 hrs', 'for every pot of dal'],
                            ['3', 'meals, from dawn to dusk'],
                        ].map(([value, label]) => (
                            <div key={label} className="flex flex-col-reverse">
                                <dt className="mt-1 text-caption text-ink-subtle">{label}</dt>
                                <dd className="text-heading tabular-nums">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}


function Signatures () {
    return (
        <section className="section md:pb-24">
            <div className="container-page">
                <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 rule">
                    <div>
                        <p className="eyebrow">From the kitchen</p>
                        <h2 className="mt-4 text-heading">Plates people come back for</h2>
                    </div>
                    <Link to="/menu" className="link-underline self-start md:self-auto text-title text-ink-muted">See the full menu</Link>
                </header>

                <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {signatures.map((dish, index) => (
                        <li key={dish.name} className={index % 2 ? 'lg:mt-16' : ''}>
                            <img src={dish.img} alt={dish.name} loading="lazy" className="frame-arch aspect-[3/4]" />
                            <p className="mt-5 text-caption italic text-accent">{dish.meal}</p>
                            <div className="mt-1 flex items-baseline gap-3">
                                <h3 className="text-title font-medium">{dish.name}</h3>
                                <span aria-hidden="true" className="leader" />
                                <p className="text-title font-medium tabular-nums">{`৳${dish.price}`}</p>
                            </div>
                            <p className="mt-1 text-note">{dish.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}


function ThroughTheDay () {
    return (
        <section className="section md:pb-24">
            <div className="container-page">
                <header className="text-center max-w-2xl mx-auto">
                    <h2 className="text-heading">From first chai to last kebab</h2>
                    <p className="mt-4 lead">Three menus, one kitchen that keeps the fire going all day.</p>
                </header>

                <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {menuSections.map(({ id, title, hours, note }) => (
                        <li key={id} className="rounded-arch border border-line px-8 pt-16 pb-8 text-center flex flex-col items-center transition-colors duration-200 ease-soft hover:border-line-strong">
                            <p lang="bn" aria-hidden="true" className="font-bengali text-heading text-accent">{mealWords[id]}</p>
                            <h3 className="mt-3 text-title font-medium">{title.replace(' Menu', '')}</h3>
                            <p className="mt-1 text-caption text-ink-subtle tabular-nums">{hours}</p>
                            <p className="mt-4 text-note flex-1">{note}</p>
                            <Link to={`/menu#${id}`} className="mt-6 link-underline text-ink-muted">
                                View {title.toLowerCase()}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}


function GuestQuote () {
    return (
        <section className="section md:py-24">
            <figure className="container-page max-w-3xl text-center py-12 rule-top rule">
                <svg viewBox="0 0 24 28" className="mx-auto h-9 w-8 text-accent" aria-hidden="true">
                    <path d="M2 27V12C2 6 6.5 1.5 12 1.5S22 6 22 12v15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 27v-13a5 5 0 0 1 10 0v13" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <blockquote className="mt-8 text-heading font-light italic">
                    “The khichuri tastes like my grandmother’s on a rainy afternoon. I didn’t expect to find that anywhere but home.”
                </blockquote>
                <figcaption className="mt-6 text-caption text-ink-subtle">A Thursday regular</figcaption>
            </figure>
        </section>
    )
}
