import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, Maximize2 } from 'lucide-react'
import Reveal from './Reveal'
import { staggerChild, staggerParent } from './motion'
import Lightbox from './Lightbox'
import { results } from '../data/content'
import './Results.css'

export default function Results() {
  const [open, setOpen] = useState(null)
  const items = results.map((r) => ({ type: 'image', src: r.image, title: r.title, client: r.tag, light: true }))
  const navigate = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length])
  const close = useCallback(() => setOpen(null), [])

  return (
    <section className="section" id="results" aria-labelledby="results-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Proven results</span>
          <h2 id="results-title" className="h2">
            Delivering tangible results <span className="muted">that propel clients’ success</span>
          </h2>
          <p className="lead">
            My work is focused on measurable outcomes that help brands stay organized, grow faster and stand out
            online. Here are the receipts.
          </p>
        </Reveal>

        <motion.div
          className="results"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {results.map((r, i) => (
            <motion.article key={r.id} className="result card" variants={staggerChild}>
              <div className="result__body">
                <span className="chip">{r.tag}</span>
                <h3 className="result__title">{r.title}</h3>
                <p className="result__metric">
                  <span>{r.metric}</span> {r.metricLabel}
                </p>
                <ul className="result__points">
                  {r.points.map((p) => (
                    <li key={p}>
                      <CheckCircle2 size={16} aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="result__shot" onClick={() => setOpen(i)} aria-label={`View proof: ${r.title}`}>
                <img src={r.image} alt="" loading="lazy" />
                <span className="result__zoom" aria-hidden="true">
                  <Maximize2 size={16} /> View proof
                </span>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <Lightbox items={items} index={open} onClose={close} onNavigate={navigate} />
    </section>
  )
}
