import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Brands from './components/Brands'
import About from './components/About'
import Results from './components/Results'
import Process from './components/Process'
import Services from './components/Services'
import Work from './components/Work'
import Certifications from './components/Certifications'
import Booking from './components/Booking'
import Faq from './components/Faq'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Brands />
        <About />
        <Results />
        <Process />
        <Services />
        <Work />
        <Certifications />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <ChatWidget />
    </MotionConfig>
  )
}
