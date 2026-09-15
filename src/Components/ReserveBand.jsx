import { hours, contact } from "../data/site";

function ReserveBand () {
    return (
        <section className="page-x pb-20 md:pb-28">
            <div className="container-page band-arch px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
                <h2 className="text-heading">Reserve Your Table</h2>
                <p className="mt-4 max-w-lg mx-auto italic font-light text-ink-inverse-muted">
                    Join us for a long lunch or a quiet dinner on {contact.address}. Tables for larger groups can be arranged a day ahead.
                </p>
                <dl className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-12 text-ink-inverse-muted">
                    {hours.map(({ days, time }) => (
                        <div key={days}>
                            <dt className="text-caption text-ink-inverse-subtle">{days}</dt>
                            <dd className="text-title">{time}</dd>
                        </div>
                    ))}
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

export default ReserveBand;
