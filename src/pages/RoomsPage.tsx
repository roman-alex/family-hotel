import { useEffect } from 'react'
import { FixedPageBackground } from '../components/FixedPageBackground'
import { Logo } from '../components/Logo'
import { AvailabilitySlotCard } from '../components/hotel/AvailabilitySlotCard'
import { site } from '../data/content'
import { roomCategories } from '../data/hotel'

const currencyFormatter = new Intl.NumberFormat('uk-UA', {
  maximumFractionDigits: 0,
})

export function RoomsPage() {
  useEffect(() => {
    document.title = `Номери — ${site.name}`
    return () => {
      document.title = `${site.name} — База відпочинку, с. Куражин`
    }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">
      <FixedPageBackground />

      <header className="border-b border-white/50 bg-white/75 px-4 py-4 shadow-sm shadow-brand-200/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-4xl flex-1 px-4 py-4 pb-12 lg:py-8">
        <h1 className="sr-only">Номери FAMILY HOTEL</h1>
        <section className="grid gap-5" aria-label="Номери">
          {roomCategories.map((room) => (
            <AvailabilitySlotCard
              key={room.id}
              slot={{
                id: room.id,
                title: room.title,
                description: room.description,
                image: room.image,
                priceLabel: `від ${currencyFormatter.format(room.priceFrom)} ₴ / доба`,
                badges: room.amenities,
              }}
              showStayDetails={false}
              showBookingButton={false}
            />
          ))}
        </section>
      </main>

      <footer className="relative border-t border-white/40 bg-white/50 px-4 py-8 text-center text-sm text-brand-600/60 backdrop-blur-sm">
        © {new Date().getFullYear()}, {site.fullName}
      </footer>
    </div>
  )
}
