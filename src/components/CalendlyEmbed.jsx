import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'
let scriptPromise

// Load Calendly's widget script once, shared by every embed on the page.
function loadCalendly() {
  scriptPromise ??= new Promise((resolve, reject) => {
    if (window.Calendly) return resolve(window.Calendly)
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.onload = () => resolve(window.Calendly)
    s.onerror = reject
    document.head.appendChild(s)
  })
  return scriptPromise
}

// Inline Calendly scheduler. Loads only when scrolled near, so it doesn't slow the first page load.
export default function CalendlyEmbed({ url }) {
  const ref = useRef(null)
  const [state, setState] = useState('idle') // idle | loading | ready | error
  const embedUrl = `${url}?hide_gdpr_banner=1&hide_event_type_details=1`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setState('loading')
        loadCalendly()
          .then((Calendly) => {
            el.innerHTML = ''
            Calendly.initInlineWidget({ url: embedUrl, parentElement: el })
            setState('ready')
          })
          .catch(() => setState('error'))
      },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [embedUrl])

  return (
    <div className="calendly">
      {state !== 'ready' && (
        <div className="calendly__status" role="status">
          {state === 'error' ? (
            <>
              <p>The scheduler couldn’t load here.</p>
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
                Open the booking page <ExternalLink size={16} aria-hidden="true" />
              </a>
            </>
          ) : (
            <>
              <Loader2 size={28} className="spin" aria-hidden="true" />
              <p>Loading available times…</p>
            </>
          )}
        </div>
      )}
      <div ref={ref} className="calendly__frame" />
      <a href={url} target="_blank" rel="noreferrer" className="calendly__fallback">
        Trouble booking? Open the scheduler in a new tab <ExternalLink size={13} aria-hidden="true" />
      </a>
    </div>
  )
}
