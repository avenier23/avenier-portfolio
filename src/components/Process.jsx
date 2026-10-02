import { motion } from 'motion/react'
import Reveal from './Reveal'
import { staggerChild, staggerParent } from './motion'
import { process } from '../data/content'
import './Process.css'

export default function Process() {
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">How I work</span>
          <h2 id="process-title" className="h2">
            From setup to scale, <span className="gradient-text">I handle the work that grows your business</span>
          </h2>
        </Reveal>

        <motion.ol
          className="process"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {process.map((p) => (
            <motion.li key={p.step} className="process__step card" variants={staggerChild}>
              <span className="process__num" aria-hidden="true">
                {p.step}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="process__tags" aria-label={`${p.title} includes`}>
                {p.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal className="process__cta">
          <a href="#book" className="btn btn-primary">
            Book an appointment
          </a>
        </Reveal>
      </div>
    </section>
  )
}
