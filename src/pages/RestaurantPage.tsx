import { useEffect } from 'react'
import { site } from '../data/content'
import { menuHits, menuSections } from '../data/restaurantMenu'
import { FixedPageBackground } from '../components/FixedPageBackground'
import { Logo } from '../components/Logo'
import { MenuItemRow } from '../components/MenuItemRow'

export function RestaurantPage() {
  useEffect(() => {
    document.title = `Ресторан — ${site.name}`
    return () => {
      document.title = `${site.name} — База відпочинку, с. Куражин`
    }
  }, [])

  return (
    <div id="top" className="relative min-h-screen">
      <FixedPageBackground />

      <header className="border-b border-white/50 bg-white/75 px-4 py-4 shadow-sm shadow-brand-200/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 py-4 pb-12 lg:py-8">
        <h1 className="sr-only">Ресторан FAMILY HOTEL</h1>

        <nav className="mb-4" aria-label="Розділи ресторану">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0">
            {menuSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-xl border border-brand-200 bg-white/50 px-4 py-2.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur-sm transition hover:border-brand-300 hover:bg-white lg:px-4 lg:py-2"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        <section className="rounded-2xl bg-white/85 p-6 shadow-lg ring-1 ring-white/60 backdrop-blur-md md:p-8">
          <h2 className="mb-5 flex items-center gap-4 font-serif text-xl font-semibold text-brand-700">
            <span className="h-px flex-1 bg-brand-300" aria-hidden />
            <span>Популярні страви</span>
            <span className="h-px flex-1 bg-brand-300" aria-hidden />
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuHits.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-xl border border-brand-200/60 bg-brand-50/80 px-3 transition hover:border-brand-300 hover:bg-white"
              >
                <MenuItemRow {...item} />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {menuSections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-6 rounded-2xl bg-white/85 p-6 shadow-lg ring-1 ring-white/60 backdrop-blur-md md:scroll-mt-8"
            >
              <h2 className="mb-1 border-b border-brand-200/80 pb-3 font-serif text-xl font-semibold text-brand-700">
                {section.title}
              </h2>
              <div>
                {section.items.map((item) => (
                  <MenuItemRow key={`${section.id}-${item.name}`} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="relative border-t border-white/40 bg-white/50 px-4 py-8 text-center text-sm text-brand-600/60 backdrop-blur-sm">
        © {new Date().getFullYear()}, {site.fullName}
      </footer>

      <a
        href="#top"
        className="fixed right-4 bottom-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white/90 text-brand-700 shadow-lg backdrop-blur-sm transition hover:border-brand-300 hover:bg-white md:right-6 md:bottom-6"
        aria-label="Повернутися вгору"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75 12 8.25l7.5 7.5"
          />
        </svg>
      </a>
    </div>
  )
}
