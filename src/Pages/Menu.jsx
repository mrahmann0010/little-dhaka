import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuCard from "../Components/MenuCard";
import ReserveBand from "../Components/ReserveBand";
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
