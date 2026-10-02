import { motion } from 'motion/react'
import { ArrowUpRight, BriefcaseBusiness, CalendarCheck, Clapperboard, Megaphone, Palette, ShoppingBag } from 'lucide-react'
import Reveal from './Reveal'
import { staggerChild, staggerParent } from './motion'
import { services } from '../data/content'
import './Services.css'

const icons = { ShoppingBag, Megaphone, Clapperboard, Palette, CalendarCheck, BriefcaseBusiness }

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Services</span>
          <h2 id="services-title" className="h2">
            E-commerce &amp; virtual support <span className="muted">that drives real growth</span>
          </h2>
          <p className="lead">
            One reliable partner for the operations, creatives and admin that keep your brand moving.
          </p>
        </Reveal>

        <motion.ul
          className="services"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <motion.li key={s.title} className="service card" variants={staggerChild}>
                <span className="service__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className="service__label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#book" className="service__link">
                  Discuss this <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> service: {s.title}</span>
                </a>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
