import { hero, site } from '../data/content'
import { asset } from '../utils/asset'
import { Logo } from './Logo'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center bg-brand-50 pt-16"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('${asset('images/pool.png')}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/80 via-brand-50/60 to-brand-100/90" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <p className="mb-2 text-lg text-brand-600 md:text-xl">{hero.welcome}</p>
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-brand-700 md:text-5xl lg:text-6xl">
          {site.fullName}
        </h1>
        <p className="mx-auto mb-4 max-w-2xl text-lg text-brand-600/80 md:text-xl">
          {site.tagline}
        </p>
        <p className="mx-auto mb-10 max-w-xl text-base text-brand-600/70">
          {hero.subtitle}
        </p>

        <div className="mx-auto flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={`tel:${site.phone}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-400 hover:shadow-xl sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            {site.phoneDisplay}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-300 px-8 py-4 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-100 sm:w-auto"
          >
            Написати в Instagram
          </a>
        </div>

        <p className="mt-6 text-sm text-brand-600/60">{site.bookingNote}</p>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-brand-400 transition hover:text-brand-500"
        aria-label="Далі"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
    </section>
  )
}
