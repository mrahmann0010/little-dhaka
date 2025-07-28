function MenuItem({name, description, price, imgsrc}) {
    return (
        <div className="flex items-center justify-between text-main-text mx-6 py-4 border-b-2 border-dotted border-main-text">
            <div className="flex gap-2">
                <div className="w-28">
                    <img src="/download.jpeg" alt="food-image"/>
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-normal">{name}</h3>
                    <p className="text-lg md:text-xl font-light">{description}</p>
                </div>
            </div>
            <div>
                <p className="text-base md:text-lg font-medium">{`$${price}`}</p>
            </div>
        </div>
    )
}

export default MenuItem;
