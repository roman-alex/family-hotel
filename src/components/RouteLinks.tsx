import { useState } from 'react'
import { site } from '../data/content'
import { NavAppIcon } from './NavAppIcon'

const apps = [
  { id: 'google', label: 'Google Maps', href: site.navigation.google },
  { id: 'waze', label: 'Waze', href: site.navigation.waze },
  { id: 'apple', label: 'Apple Maps', href: site.navigation.apple },
] as const

const heroAddress = `${site.address.village}, ${site.address.region.replace(', Україна', '')}`

type RouteLinksProps = {
  variant?: 'full' | 'inline'
}

export function RouteLinks({ variant = 'full' }: RouteLinksProps) {
  const [open, setOpen] = useState(false)
  const menuBelow = variant === 'inline'

  return (
    <div className={variant === 'full' ? 'relative' : 'relative inline-block'}>
      {variant === 'full' ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-300 bg-brand-50 py-4 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-100"
        >
          <NavigationIcon className="h-5 w-5" />
          Прокласти маршрут
        </button>
      ) : (
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-brand-600/80">
          <span className="inline-flex items-center gap-1.5">
            <PinIcon />
            {heroAddress}
          </span>
          <span aria-hidden className="text-brand-400">
            ·
          </span>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1 font-semibold text-brand-600 underline-offset-2 transition hover:text-brand-700 hover:underline"
            aria-expanded={open}
            aria-haspopup="true"
          >
            <NavigationIcon className="h-4 w-4" />
            Маршрут
          </button>
        </p>
      )}

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            aria-label="Закрити"
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute z-50 min-w-[12rem] overflow-hidden rounded-xl border-2 border-brand-300 bg-brand-50 py-1 shadow-xl ${
              menuBelow
                ? 'top-full left-1/2 mt-2 -translate-x-1/2'
                : 'right-0 bottom-full left-0 mb-2'
            }`}
          >
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-brand-700 transition hover:bg-brand-100"
                onClick={() => setOpen(false)}
              >
                <NavAppIcon id={app.id} />
                {app.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-brand-500"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function NavigationIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  )
}
