import { FiPhone } from 'react-icons/fi'
import { site } from '../../data/content'
import type { HotelAvailabilityItem } from '../../data/hotel'

type AvailabilitySlotCardProps = {
  slot: HotelAvailabilityItem
}

export function AvailabilitySlotCard({ slot }: AvailabilitySlotCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white/90 shadow-lg ring-1 ring-white/70 backdrop-blur-md">
      <div
        className={
          slot.image
            ? 'grid gap-0 md:grid-cols-[220px_1fr] md:items-center'
            : 'grid gap-0'
        }
      >
        {slot.image && (
          <img
            src={slot.image}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full bg-brand-100 object-cover md:ml-5 md:h-40 md:w-[200px] md:rounded-xl"
          />
        )}

        <div className="flex flex-col gap-3 p-5 md:p-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <p className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200/70">
                {slot.dateLabel}
              </p>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-brand-200/70">
                {slot.weekdayLabel}
              </p>
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-700">
              {slot.title}
            </h2>
            <p className="mt-1 text-sm text-brand-600/70">
              {slot.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {slot.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-200/70"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-brand-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-brand-700 md:text-base">
              {slot.priceLabel}
            </p>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-400"
            >
              <FiPhone className="h-4 w-4" aria-hidden />
              Забронювати
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
