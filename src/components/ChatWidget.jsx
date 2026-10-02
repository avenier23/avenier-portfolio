import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, CalendarDays, MessageCircle, Sparkles, X } from 'lucide-react'
import { profile } from '../data/content'
import './ChatWidget.css'

const GREETING = {
  role: 'assistant',
  content:
    'Hi! I’m Ave’s AI assistant. Ask me anything about Avenier’s services, results or how working together looks.',
}

const SUGGESTIONS = [
  'What services does Avenier offer?',
  'What results has Avenier delivered?',
  'Can Avenier manage my Shopify store?',
  'How do I book a call?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function ask(text) {
    const question = text.trim()
    if (!question || loading) return
    const next = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The greeting is UI-only; the API conversation starts with the visitor's first message.
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING && !m.error) }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.reply) throw new Error(data.error || 'unavailable')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      const msg =
        err.message && err.message !== 'unavailable' && !err.message.startsWith('Failed')
          ? err.message
          : 'I’m offline right now.'
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          error: true,
          content: `${msg} You can still reach Avenier on WhatsApp (${profile.whatsappDisplay}), at ${profile.email}, or through the booking form below.`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const showSuggestions = messages.length === 1 && !loading

  return (
    <div className="chat">
      <AnimatePresence>
        {open && (
          <motion.section
            id="chat-panel"
            className="chat__panel"
            role="dialog"
            aria-label="Chat with Ave’s AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <header className="chat__head">
              <span className="chat__avatar" aria-hidden="true">
                <img src="/media/img/profile-studio.webp" alt="" />
                <span className="chat__online" />
              </span>
              <span className="chat__who">
                <strong>Ave’s AI Assistant</strong>
                <small>
                  <Sparkles size={12} aria-hidden="true" /> Powered by Claude · usually instant
                </small>
              </span>
              <button
                className="chat__icon-btn"
                onClick={() => {
                  setOpen(false)
                  launcherRef.current?.focus()
                }}
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </header>

            <div className="chat__list" ref={listRef} aria-live="polite" aria-busy={loading}>
              {messages.map((m, i) => (
                <div key={i} className={`chat__msg chat__msg--${m.role} ${m.error ? 'is-error' : ''}`}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="chat__msg chat__msg--assistant chat__typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {showSuggestions && (
                <div className="chat__suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => ask(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#book" className="chat__book" onClick={() => setOpen(false)}>
              <CalendarDays size={16} aria-hidden="true" /> Book a free discovery call
            </a>

            <form
              className="chat__form"
              onSubmit={(e) => {
                e.preventDefault()
                ask(input)
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Your message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, results, tools…"
                maxLength={2000}
                autoComplete="off"
              />
              <button type="submit" className="chat__send" disabled={!input.trim() || loading} aria-label="Send message">
                <ArrowUp size={18} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        className={`chat__launcher ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 20 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat__launcher-text">Ask my AI</span>}
      </motion.button>
    </div>
  )
}
