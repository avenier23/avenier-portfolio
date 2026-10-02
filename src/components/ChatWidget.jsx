import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, CalendarDays, MessageCircle, Sparkles, X } from 'lucide-react'
import { profile } from '../data/content'
import { findAnswer, topics } from '../data/assistant'
import './ChatWidget.css'

// Set VITE_AI_ENABLED=true (plus ANTHROPIC_API_KEY on the server) to switch from instant
// built-in answers to the Claude-powered assistant in api/chat.js.
const AI_ENABLED = import.meta.env.VITE_AI_ENABLED === 'true'

const GREETING = {
  role: 'assistant',
  content: AI_ENABLED
    ? 'Hi! I’m Ave’s AI assistant. Ask me anything about Avenier’s services, results or how working together looks.'
    : 'Hi! I’m Ave’s assistant. Pick a topic below or type a question about Avenier’s services, results or how to work together.',
  showTopics: true,
}

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

    if (!AI_ENABLED) {
      // Short pause so the reply feels conversational rather than instant-swap.
      const reply = findAnswer(question)
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: reply.answer, actions: reply.actions, showTopics: reply.showTopics },
        ])
        setLoading(false)
      }, 450)
      return
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The greeting is UI-only; the API conversation starts with the visitor's first message.
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING && !m.error).map(({ role, content }) => ({ role, content })),
        }),
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

  const close = () => setOpen(false)
  const last = messages[messages.length - 1]

  return (
    <div className="chat">
      <AnimatePresence>
        {open && (
          <motion.section
            id="chat-panel"
            className="chat__panel"
            role="dialog"
            aria-label="Chat with Ave’s assistant"
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
                <strong>{AI_ENABLED ? 'Ave’s AI Assistant' : 'Ave’s Assistant'}</strong>
                <small>
                  <Sparkles size={12} aria-hidden="true" /> {AI_ENABLED ? 'Powered by Claude · usually instant' : 'Instant answers'}
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
                  {m.actions?.length > 0 && (
                    <span className="chat__actions">
                      {m.actions.map((a) => (
                        <a
                          key={a.label}
                          href={a.href}
                          {...(a.external ? { target: '_blank', rel: 'noreferrer' } : { onClick: close })}
                        >
                          {a.label}
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              ))}
              {loading && (
                <div className="chat__msg chat__msg--assistant chat__typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {!loading && last.showTopics && (
                <div className="chat__suggestions">
                  {topics.map((t) => (
                    <button key={t.id} onClick={() => ask(t.label)}>
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#book" className="chat__book" onClick={close}>
              <CalendarDays size={16} aria-hidden="true" /> Book a free strategy meeting
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
                placeholder="Ask about services, results, rates…"
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
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 20 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat__launcher-text">{AI_ENABLED ? 'Ask my AI' : 'Ask me anything'}</span>}
      </motion.button>
    </div>
  )
}
