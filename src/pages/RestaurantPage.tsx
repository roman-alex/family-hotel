import { useEffect } from 'react'
import { asset } from '../utils/asset'
import { site } from '../data/content'
import { Logo } from '../components/Logo'

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
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-brand-200/60">
          <img
            src={asset('images/restaurant.png')}
            alt="Ресторан FAMILY HOTEL"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand-500">
            Ресторан
          </p>
          <h1 className="mb-4 font-serif text-3xl font-bold text-brand-700 md:text-4xl">
            Меню ресторану
          </h1>
          <p className="mx-auto max-w-md text-brand-600/80">
            Меню готується. Скоро тут з&apos;явиться повний перелік страв і
            напоїв.
          </p>
        </div>

        <div className="mt-12 space-y-6 rounded-2xl bg-white p-8 shadow-md ring-1 ring-brand-200/40">
          {['Закуски', 'Основні страви', 'Напої'].map((section) => (
            <div key={section} className="border-b border-brand-100 pb-6 last:border-0 last:pb-0">
              <h2 className="mb-3 font-serif text-xl font-semibold text-brand-700">
                {section}
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="h-4 flex-1 rounded bg-brand-100" />
                    <span className="h-4 w-12 rounded bg-brand-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-4 py-8 text-center text-sm text-brand-600/50">
        © {new Date().getFullYear()}, {site.fullName}
      </footer>
    </div>
  )
}
