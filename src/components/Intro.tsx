import { intro } from '../data/content'

export function Intro() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        {intro.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 30)}
            className="mb-6 text-lg leading-relaxed text-brand-600/80 last:mb-0 md:text-xl"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
