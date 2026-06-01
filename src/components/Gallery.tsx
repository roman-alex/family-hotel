import { galleryImages } from '../data/content'

export function Gallery() {
  return (
    <section id="gallery" className="bg-brand-700 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
            Фотогалерея
          </h2>
          <p className="text-brand-200/70">
            Атмосфера та територія бази відпочинку
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {galleryImages.map((image) => (
            <div key={image.src} className="group overflow-hidden rounded-xl">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
