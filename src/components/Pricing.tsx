import { pricing, site } from '../data/content'

export function Pricing() {
  const colCount = pricing.seasons.length + 1

  return (
    <section id="pricing" className="bg-warm-100 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-serif text-3xl font-bold text-brand-700 md:text-4xl">
            {pricing.title}
          </h2>
          <p className="text-brand-600/70">{pricing.subtitle}</p>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">
          <div
            className="grid min-w-[540px] bg-brand-300/30 px-4 py-4 text-sm font-semibold text-brand-700 md:min-w-0 md:px-6 md:text-base"
            style={{ gridTemplateColumns: `1.4fr repeat(${pricing.seasons.length}, 1fr)` }}
          >
            <div>Категорія номера</div>
            {pricing.seasons.map((season) => (
              <div key={season.period} className="text-center">
                {season.period}
              </div>
            ))}
          </div>

          {pricing.rooms.map((room, i) => (
            <div
              key={room.name}
              className={`grid min-w-[540px] items-center px-4 py-4 md:min-w-0 md:px-6 ${
                i % 2 === 0 ? 'bg-white' : 'bg-brand-50/50'
              } ${i < pricing.rooms.length - 1 ? 'border-b border-brand-100' : ''}`}
              style={{ gridTemplateColumns: `1.4fr repeat(${colCount - 1}, 1fr)` }}
            >
              <div className="pr-2 text-sm text-brand-700 md:text-base">
                {room.name}
              </div>
              {room.prices.map((price, j) => (
                <div
                  key={`${room.name}-${j}`}
                  className="text-center text-sm font-medium text-brand-600 md:text-base"
                >
                  {price.toLocaleString('uk-UA')} ₴
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-brand-600/60">
          {pricing.note}
        </p>

        <div className="mt-8 text-center">
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3 font-semibold text-brand-700 transition hover:bg-brand-400"
          >
            Забронювати: {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
