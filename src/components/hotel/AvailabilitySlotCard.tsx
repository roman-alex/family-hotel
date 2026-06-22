import {
  FiCheck,
  FiHome,
  FiMaximize2,
  FiPhone,
  FiSmile,
  FiTv,
  FiUsers,
  FiWifi,
} from 'react-icons/fi'
import {
  LuCircleParking,
  LuCookingPot,
  LuRefrigerator,
  LuShowerHead,
  LuSnowflake,
} from 'react-icons/lu'
import { TbPool } from 'react-icons/tb'
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
              <p className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-300/70">
                {slot.dateLabel}
              </p>
              <p className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-300/70">
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
              <AmenityItem key={badge} badge={badge} />
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

function isGuestsBadge(badge: string) {
  return badge.toLowerCase().includes('гост')
}

function getGuestsValue(badge: string) {
  return badge.replace(/\s*гост(ей|і|я)?\s*/i, '').trim()
}

function AmenityItem({ badge }: { badge: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-200/70"
      title={badge}
    >
      <BadgeIcon badge={badge} />
      <span>{getBadgeLabel(badge)}</span>
    </span>
  )
}

function getBadgeLabel(badge: string) {
  if (isGuestsBadge(badge)) {
    return `до ${getGuestsValue(badge)} гостей`
  }

  return badge
}

function BadgeIcon({ badge }: { badge: string }) {
  const normalizedBadge = badge.toLowerCase()

  if (normalizedBadge.includes('ноч')) {
    return <FiCheck className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('гост')) {
    return <FiUsers className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('кондиціонер')) {
    return <LuSnowflake className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('wi-fi')) {
    return <FiWifi className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('tv')) {
    return <FiTv className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('парков')) {
    return <LuCircleParking className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('басейн')) {
    return <TbPool className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('кух')) {
    return <LuCookingPot className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('холод')) {
    return <LuRefrigerator className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('душ')) {
    return <LuShowerHead className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('балкон') ||
    normalizedBadge.includes('санвузол')
  ) {
    return <FiHome className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('просторо') ||
    normalizedBadge.includes('кілька зон')
  ) {
    return <FiMaximize2 className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('сімейний') ||
    normalizedBadge.includes('родини') ||
    normalizedBadge.includes('компанії')
  ) {
    return <FiSmile className="h-4 w-4 shrink-0" aria-hidden />
  }

  return <FiCheck className="h-4 w-4 shrink-0" aria-hidden />
}
