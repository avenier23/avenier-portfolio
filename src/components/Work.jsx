import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Expand, Play } from 'lucide-react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { work, workFilters } from '../data/content'
import './Work.css'

const INITIAL = 12

export default function Work() {
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState(null)

  const filtered = useMemo(() => (filter === 'All' ? work : work.filter((w) => w.category === filter)), [filter])
  const visible = showAll ? filtered : filtered.slice(0, INITIAL)

  const navigate = useCallback((d) => setOpen((i) => (i + d + filtered.length) % filtered.length), [filtered.length])
  const close = useCallback(() => setOpen(null), [])

  const counts = useMemo(() => {
    const c = { All: work.length }
    work.forEach((w) => (c[w.category] = (c[w.category] || 0) + 1))
    return c
  }, [])

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Portfolio</span>
          <h2 id="work-title" className="h2">
            Selected work <span className="muted">that propels brands forward</span>
          </h2>
          <p className="lead">
            Ad creatives, reels, social content and brand identities I’ve produced for clients and campaigns.
            Tap any piece to view it full size.
          </p>
        </Reveal>

        <div className="work__filters" role="group" aria-label="Filter portfolio by category">
          {workFilters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              className={`work__filter ${filter === f ? 'is-active' : ''}`}
              onClick={() => {
                setFilter(f)
                setShowAll(false)
              }}
            >
              {filter === f && (
                <motion.span layoutId="work-filter-pill" className="work__filter-pill" aria-hidden="true" />
              )}
              <span className="work__filter-text">
                {f} <small>{counts[f] || 0}</small>
              </span>
            </button>
          ))}
        </div>

        <motion.ul className="work__grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.li
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 26, delay: Math.min(i, 8) * 0.03 }}
                className={`work__item ${item.type === 'video' && !item.landscape ? 'is-tall' : ''}`}
              >
                <button className="work__card" onClick={() => setOpen(filtered.indexOf(item))}>
                  <span className={`work__media ${item.light ? 'is-light' : ''}`}>
                    <img src={item.type === 'video' ? item.poster : item.src} alt="" loading="lazy" />
                    <span className="work__badge" aria-hidden="true">
                      {item.type === 'video' ? <Play size={18} fill="currentColor" /> : <Expand size={16} />}
                    </span>
                  </span>
                  <span className="work__meta">
                    <span className="work__title">{item.title}</span>
                    <span className="work__client">
                      {item.client} · {item.type === 'video' ? 'Video' : item.category}
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length > INITIAL && (
          <div className="work__more">
            <button className="btn btn-ghost" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
              {showAll ? 'Show less' : `Show all ${filtered.length} pieces`}
            </button>
          </div>
        )}
      </div>

      <Lightbox items={filtered} index={open} onClose={close} onNavigate={navigate} />
    </section>
  )
}
