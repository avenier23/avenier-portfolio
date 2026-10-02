import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import Reveal from './Reveal'
import { faqs } from '../data/content'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <Reveal className="faq__head">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="h2">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="lead">
            Can’t find your answer? Ask my AI assistant in the corner, or book a quick call.
          </p>
        </Reveal>

        <ul className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={f.q} delay={i * 0.04} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <Plus size={20} aria-hidden="true" className="faq__icon" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
                      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
