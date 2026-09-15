import { hours, contact } from "../data/site";
import { BookTableButton } from "./Booking";

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
                <BookTableButton variant="inverse" size="lg" className="mt-10" />
            </div>
        </section>
    )
}

export default ReserveBand;
