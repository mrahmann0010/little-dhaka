import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuCard from "../Components/MenuCard";
import { menuSections, heroImages } from "../data/menu";


function Menu() {
    const { hash } = useLocation();

    // React Router doesn't scroll to hashes on its own (e.g. footer links to /menu#dinner).
    useEffect(() => {
        if (!hash) return;
        document.getElementById(hash.slice(1))?.scrollIntoView();
    }, [hash]);

    return (
        <main>
            <MenuHero />
            <MenuTabs />
            {menuSections.map((section) => (
                <MenuCard
                    key={section.id}
                    id={section.id}
                    menuTitle={section.title}
                    hours={section.hours}
                    note={section.note}
                    menu={section.items}
                />
            ))}
            <ReserveBand />
        </main>
    )
}

export default Menu;


function MenuHero () {
    return(
        <section className="pt-14 md:pt-24 overflow-hidden">
            <div className="page-x max-w-3xl mx-auto text-center">
                <h1 className="text-display">
                    Dive Into Delicious Meal Dishes
                </h1>
                <p className="mt-6 lead max-w-prose mx-auto">
                    Slow-cooked curries, charcoal kebabs and fragrant rice, made fresh every day the old Dhaka way.
                </p>
            </div>

            <div className="page-x mt-12 md:mt-16 flex md:grid md:grid-cols-6 items-end gap-3 md:gap-5 pb-12 md:pb-16 overflow-x-auto md:overflow-visible snap-x snap-mandatory rule">
                {heroImages.map((src, index) => (
                    <div
                        key={src}
                        className={`shrink-0 w-40 md:w-auto snap-center motion-safe:animate-rise ${index % 2 ? 'md:mb-10' : ''}`}
                        style={{ animationDelay: `${index * 90}ms` }}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`frame-arch ${index % 2 ? 'aspect-[3/4]' : 'aspect-[3/5]'}`}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}


function MenuTabs () {
    const [active, setActive] = useState(menuSections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        menuSections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav aria-label="Menu sections" className="sticky top-0 z-20 bg-surface/90 backdrop-blur border-b border-line-faint">
            <ul className="page-x flex justify-center gap-2 md:gap-4 py-3 overflow-x-auto">
                {menuSections.map(({ id, title }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            aria-current={active === id ? 'true' : undefined}
                            className={`tab ${active === id ? 'tab-active' : ''}`}
                        >
                            {title.replace(' Menu', '')}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


function ReserveBand () {
    return (
        <section className="page-x pb-20 md:pb-28">
            <div className="container-page band-arch px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
                <h2 className="text-heading">Reserve Your Table</h2>
                <p className="mt-4 max-w-lg mx-auto italic font-light text-ink-inverse-muted">
                    Join us for a long lunch or a quiet dinner. Tables for larger groups can be arranged a day ahead.
                </p>
                <dl className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-12 text-ink-inverse-muted">
                    <div>
                        <dt className="text-caption text-ink-inverse-subtle">Monday – Friday</dt>
                        <dd className="text-title">8:00 am – 10:30 pm</dd>
                    </div>
                    <div>
                        <dt className="text-caption text-ink-inverse-subtle">Saturday – Sunday</dt>
                        <dd className="text-title">9:00 am – 11:00 pm</dd>
                    </div>
                </dl>
                <button type="button" className="mt-10 btn-inverse btn-lg">
                    Book a Table
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </section>
    )
}
