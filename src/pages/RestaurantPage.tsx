import { useEffect } from 'react'
import { asset } from '../utils/asset'
import { site } from '../data/content'
import { menuHits, menuSections } from '../data/restaurantMenu'
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
    <div className="min-h-screen bg-warm-100">
      <header className="border-b border-brand-200/60 bg-white/90 px-4 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-brand-200/60">
          <img
            src={asset('images/restaurant-interior.png')}
            alt="Інтер'єр ресторану FAMILY HOTEL"
            className="aspect-[4/3] w-full object-cover md:aspect-[16/9]"
          />
        </div>

        <div className="mt-10 text-center">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-brand-500">
            Restaurant
          </p>
          <h1 className="font-serif text-4xl font-bold text-brand-700 md:text-5xl">
            Меню
          </h1>
        </div>

        <section className="mt-10">
          <h2 className="mb-5 text-center font-serif text-xl font-semibold text-brand-700">
            ★ Хіти меню ★
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuHits.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-brand-200/50"
              >
                <span className="font-medium text-brand-700">{item.name}</span>
                <span className="shrink-0 font-semibold tabular-nums text-brand-600">
                  {item.price}&nbsp;грн
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {menuSections.map((section) => (
            <section
              key={section.id}
              className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-brand-200/40"
            >
              <h2 className="mb-2 border-b border-brand-200 pb-3 font-serif text-xl font-semibold text-brand-700">
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

      <footer className="px-4 py-8 text-center text-sm text-brand-600/50">
        © {new Date().getFullYear()}, {site.fullName}
      </footer>
    </div>
  )
}
