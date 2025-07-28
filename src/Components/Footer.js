function Footer() {
    return (
        <footer className="grid grid-cols-1 px-8 md:px-20 md:grid-cols-9 bg-main-bg py-10 font-notoserif">
            <div className="col-span-3 flex flex-col gap-2 text-main-text">
                <h6 className="text-xl">Contact</h6>
                <span className="text-main-text flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                    </svg>
                    <p>O2 3863 3737</p>
                </span>
                <span className="text-main-text flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <p>Park Street Avenue</p>
                </span>
                <span className="text-main-text flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M2.106 6.447A2 2 0 0 0 1 8.237V16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.236a2 2 0 0 0-1.106-1.789l-7-3.5a2 2 0 0 0-1.788 0l-7 3.5Zm1.48 4.007a.75.75 0 0 0-.671 1.342l5.855 2.928a2.75 2.75 0 0 0 2.46 0l5.852-2.927a.75.75 0 1 0-.67-1.341l-5.853 2.926a1.25 1.25 0 0 1-1.118 0l-5.856-2.928Z" clipRule="evenodd" />
                    </svg>
                    <p>abc@gmail.com</p>
                </span>
            </div>

            <div className="col-span-2 text-main-text flex flex-col gap-2">
                <h6 className="text-xl">Navigate</h6>
                <ul className="flex flex-col gap-2">
                    <li><a href="/">Home</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/order">Order</a></li>
                </ul>
            </div>
            
            {/* Have to deal Later - see the menu items */}
            <div className="col-span-2 text-main-text flex flex-col gap-2">
                <h6 className="text-xl">Menu</h6>
                <ul className="col-span-1 flex flex-col gap-2">
                    <li><a href="/">BreakFast</a></li>
                    <li><a href="/menu">Lunch</a></li>
                    <li><a href="/order">Dinner</a></li>
                </ul>
            </div>

            <div className="col-span-2 text-main-text flex flex-col gap-2">
                <h6 className="text-xl">Social</h6>
                <ul className="col-span-1 flex flex-col gap-2">
                    <li><a href="#">FaceBokk</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer
