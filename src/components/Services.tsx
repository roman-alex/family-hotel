import { services } from '../data/content'
import { ServiceCard } from './ServiceCard'

export function Services() {
  return (
    <section id="services" className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-brand-700 md:text-4xl">
            Наші послуги
          </h2>
          <p className="mx-auto max-w-2xl text-brand-600/60">
            Все для комфортного сімейного відпочинку на базі «FAMILY HOTEL»
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              cta={service.cta}
              image={service.image}
              imageAlt={service.imageAlt}
              secondaryImage={'secondaryImage' in service ? service.secondaryImage : undefined}
              secondaryImageAlt={'secondaryImageAlt' in service ? service.secondaryImageAlt : undefined}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
