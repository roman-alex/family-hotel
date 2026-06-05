import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { Gallery } from '../components/Gallery'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Intro } from '../components/Intro'
import { Pricing } from '../components/Pricing'
import { Services } from '../components/Services'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Pricing />
        <Gallery />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
