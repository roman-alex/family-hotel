import { useEffect } from 'react'
import { site } from '../data/content'
import { menuHits, menuSections } from '../data/restaurantMenu'
import { FixedPageBackground } from '../components/FixedPageBackground'
import { Logo } from '../components/Logo'
import { MenuItemRow } from '../components/MenuItemRow'

export function RestaurantPage() {
  useEffect(() => {
    document.title = `Меню ресторану — ${site.name}`
    return () => {
      document.title = `${site.name} — База відпочинку, с. Куражин`
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <FixedPageBackground />

      <header className="border-b border-white/50 bg-white/75 px-4 py-4 shadow-sm shadow-brand-200/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 py-8 pb-12 md:py-12">
        <div className="mb-10 text-center">
          <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-brand-500">
            Restaurant
          </p>
          <h1 className="font-serif text-4xl font-bold text-brand-700 md:text-5xl">
            Меню
          </h1>
        </div>

        <section className="rounded-2xl bg-white/85 p-6 shadow-lg ring-1 ring-white/60 backdrop-blur-md md:p-8">
          <h2 className="mb-5 flex items-center gap-4 font-serif text-xl font-semibold text-brand-700">
            <span className="h-px flex-1 bg-brand-300" aria-hidden />
            <span>Хіти меню</span>
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
              key={section.id}
              className="rounded-2xl bg-white/85 p-6 shadow-lg ring-1 ring-white/60 backdrop-blur-md"
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
    </div>
  )
}
