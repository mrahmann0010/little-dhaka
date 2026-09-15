import MenuItem from "./MenuItem";


function MenuCard({id, menuTitle, hours, note, menu}) {
    return (
        <section id={id} className="section scroll-mt-24">
            <div className="container-page">
                <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pb-6 rule">
                    <div>
                        <h2 className="text-heading">{menuTitle}</h2>
                        <p className="mt-3 max-w-md text-note">{note}</p>
                    </div>
                    <p className="text-lead text-accent">Served {hours}</p>
                </header>

                <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
                    {menu.map((item)=>(
                        <MenuItem key={item.name} name={item.name} description={item.description} price={item.price} imgsrc={item.img} tags={item.tags} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default MenuCard
