import { useState } from 'react'
import { site } from '../data/content'

const apps = [
  { id: 'google', label: 'Google Maps', href: site.navigation.google },
  { id: 'waze', label: 'Waze', href: site.navigation.waze },
  { id: 'apple', label: 'Apple Maps', href: site.navigation.apple },
] as const

export function RouteLinks() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-300 bg-brand-50 py-4 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-100"
      >
        <NavigationIcon />
        Прокласти маршрут
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            aria-label="Закрити"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 bottom-full left-0 z-50 mb-2 overflow-hidden rounded-xl border border-brand-500/30 bg-brand-700 py-1 shadow-2xl ring-2 ring-brand-300/40">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-white transition hover:bg-brand-600"
                onClick={() => setOpen(false)}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  {app.label.charAt(0)}
                </span>
                {app.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function NavigationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  )
}
