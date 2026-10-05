import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { Expand, Play } from 'lucide-react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { workCount, workGroups } from '../data/content'
import './Work.css'

const INITIAL = 8

export default function Work() {
  // { items: the list being browsed (a group, or one style of it), index } of the piece open in the viewer
  const [open, setOpen] = useState(null)
  const items = open ? open.items : []

  const navigate = useCallback(
    (d) => setOpen((o) => ({ ...o, index: (o.index + d + items.length) % items.length })),
    [items.length],
  )
  const close = useCallback(() => setOpen(null), [])

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Portfolio</span>
          <h2 id="work-title" className="h2">
            Selected work <span className="muted">that propels brands forward</span>
          </h2>
          <p className="lead">
            {workCount} pieces across AI reels, CapCut edits, Kickstarter ads, AI product videos, graphic design and
            branding. Tap any piece to view it full size.
          </p>
        </Reveal>

        <nav className="work__jump" aria-label="Portfolio sections">
          {workGroups.map((g) => (
            <a key={g.id} href={`#work-${g.id}`}>
              {g.title} <small>{g.items.length}</small>
            </a>
          ))}
        </nav>

        {workGroups.map((g) => (
          <WorkGroup key={g.id} group={g} onOpen={(list, index) => setOpen({ items: list, index })} />
        ))}
      </div>

      <Lightbox items={items} index={open ? open.index : null} onClose={close} onNavigate={navigate} />
    </section>
  )
}

function WorkGroup({ group, onOpen }) {
  const [showAll, setShowAll] = useState(false)
  const [style, setStyle] = useState(null)
  const list = style ? group.items.filter((item) => item.style === style) : group.items
  const visible = showAll ? list : list.slice(0, INITIAL)
  const headingId = `work-${group.id}-title`

  return (
    <section className="work__group" id={`work-${group.id}`} aria-labelledby={headingId}>
      <Reveal className="work__group-head">
        <div>
          <span className="work__tool">{group.tool}</span>
          <h3 id={headingId}>
            {group.title} <span className="work__count">{group.items.length}</span>
          </h3>
        </div>
        <p>{group.description}</p>
      </Reveal>

      {group.styles && (
        <div className="work__filters" role="group" aria-label={`Filter ${group.title} by style`}>
          {[null, ...group.styles].map((s) => (
            <button
              key={s ?? 'all'}
              className="work__filter"
              aria-pressed={style === s}
              onClick={() => {
                setStyle(s)
                setShowAll(false)
              }}
            >
              {s ?? 'All'} <small>{s ? group.items.filter((item) => item.style === s).length : group.items.length}</small>
            </button>
          ))}
        </div>
      )}

      <ul className="work__grid">
        {visible.map((item, i) => (
          <motion.li
            key={item.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26, delay: (i % 4) * 0.04 }}
            className={`work__item ${(item.type === 'video' && !item.landscape) || item.tall ? 'is-tall' : ''}`}
          >
            <button className="work__card" onClick={() => onOpen(list, i)}>
              <span className={`work__media ${item.light ? 'is-light' : ''} ${item.dark ? 'is-dark' : ''}`}>
                <img src={item.type === 'video' ? item.poster : item.src} alt="" loading="lazy" />
                <span className="work__badge" aria-hidden="true">
                  {item.type === 'video' ? <Play size={18} fill="currentColor" /> : <Expand size={16} />}
                </span>
              </span>
              <span className="work__meta">
                <span className="work__title">{item.title}</span>
                <span className="work__client">
                  {item.client} · {item.type === 'video' ? 'Video' : 'Image'}
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      {list.length > INITIAL && (
        <div className="work__more">
          <button className="btn btn-ghost" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
            {showAll ? 'Show less' : `Show all ${list.length} in ${style ?? group.title}`}
          </button>
        </div>
      )}
    </section>
  )
}
