import { site } from '../data/content'

type ServiceCardProps = {
  title: string
  description: string
  cta: string
  ctaHref?: string
  image: string
  imageAlt: string
  secondaryImage?: string
  secondaryImageAlt?: string
  reversed?: boolean
}

export function ServiceCard({
  title,
  description,
  cta,
  ctaHref,
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
  reversed = false,
}: ServiceCardProps) {
  return (
    <article
      className={`flex flex-col gap-8 md:gap-12 ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } md:items-center`}
    >
      <div className="md:w-1/2">
        {secondaryImage ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={image}
                alt={imageAlt}
                className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={secondaryImage}
                alt={secondaryImageAlt ?? title}
                className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={image}
              alt={imageAlt}
              className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="md:w-1/2">
        <h3 className="mb-4 font-serif text-2xl font-bold text-brand-700 md:text-3xl">
          {title}
        </h3>
        <p className="mb-6 leading-relaxed text-brand-600/70">{description}</p>
        <a
          href={ctaHref ?? `tel:${site.phone}`}
          className="inline-flex items-center gap-2 font-semibold text-brand-600 transition hover:text-brand-700"
        >
          {cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </article>
  )
}
