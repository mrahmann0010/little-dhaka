function MenuItem({name, description, price, imgsrc, tags = []}) {
    return (
        <li className="flex items-center gap-4 md:gap-5 py-5 rule-soft">
            <img src={imgsrc} alt={name} loading="lazy" className="frame-round size-16 md:size-20" />
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                    <h3 className="text-title font-medium">{name}</h3>
                    <span aria-hidden="true" className="leader" />
                    <p className="text-title font-medium tabular-nums">{`৳${price}`}</p>
                </div>
                <p className="mt-1 text-note">{description}</p>
                {tags.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <li key={tag} className="chip">{tag}</li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    )
}

export default MenuItem;
