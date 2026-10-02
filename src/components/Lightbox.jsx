import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './Lightbox.css'

// Full-screen viewer for images and videos. `items` is the list being browsed, `index` the open one.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const open = index !== null && index >= 0
  const item = open ? items[index] : null

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocus.current?.focus?.()
    }
  }, [open, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button ref={closeRef} className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close viewer">
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button className="lightbox__btn lightbox__prev" onClick={() => onNavigate(-1)} aria-label="Previous item">
                <ChevronLeft size={24} />
              </button>
              <button className="lightbox__btn lightbox__next" onClick={() => onNavigate(1)} aria-label="Next item">
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.figure
            key={item.src}
            className="lightbox__figure"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            {item.type === 'video' ? (
              <video src={item.src} poster={item.poster} controls autoPlay playsInline className="lightbox__media" />
            ) : (
              <img src={item.src} alt={item.title} className={`lightbox__media ${item.light ? 'is-light' : ''}`} />
            )}
            <figcaption>
              <strong>{item.title}</strong>
              {item.client && <span>{item.client}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
