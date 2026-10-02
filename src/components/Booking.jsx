import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, CheckCircle2, Clock, Loader2, Mail, Send } from 'lucide-react'
import Reveal from './Reveal'
import SocialIcon from './SocialIcons'
import { bookingServices, profile, socials, timeSlots } from '../data/content'
import './Booking.css'

// Optional: set VITE_WEB3FORMS_KEY in .env to deliver bookings straight to the inbox via web3forms.com.
// Without it, the form opens a pre-filled email to Avenier instead.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const initial = {
  name: '',
  email: '',
  company: '',
  service: '',
  date: '',
  time: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  message: '',
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your email so I can confirm the call.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email looks incomplete, e.g. name@company.com.'
  if (!v.service) e.service = 'Choose what you’d like help with.'
  if (!v.date) e.date = 'Pick a preferred date.'
  else if (v.date < todayISO()) e.date = 'Please choose today or a future date.'
  if (!v.time) e.time = 'Pick a preferred time slot.'
  return e
}

const labels = { name: 'Name', email: 'Email', service: 'Service', date: 'Date', time: 'Time slot' }

export default function Booking() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const summaryRef = useRef(null)
  const minDate = useMemo(() => todayISO(), [])

  const set = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }
  const fieldError = (f) => (touched[f] ? errors[f] : undefined)

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, service: true, date: true, time: true })
    const errKeys = Object.keys(errs)
    if (errKeys.length) {
      // Several errors: focus the summary. One error: jump straight to that field.
      requestAnimationFrame(() => {
        if (errKeys.length > 1) return summaryRef.current?.focus()
        const el = document.getElementById(`bk-${errKeys[0]}`)
        ;(el?.matches('input, select, textarea') ? el : el?.querySelector('input'))?.focus()
      })
      return
    }

    const subject = `Discovery call request: ${values.service}`
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company && `Company: ${values.company}`,
      `Service: ${values.service}`,
      `Preferred date: ${values.date} at ${values.time} (${values.timezone})`,
      values.message && `\nMessage:\n${values.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: values.name, replyto: values.email, message: body }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const errorList = Object.entries(errors).filter(([k]) => touched[k])

  return (
    <section className="section" id="book" aria-labelledby="book-title">
      <div className="container booking">
        <Reveal className="booking__intro">
          <span className="eyebrow">Book a call</span>
          <h2 id="book-title" className="h2">
            Let’s talk about <span className="gradient-text">your next big move</span>
          </h2>
          <p className="lead">
            Pick a time that suits you for a free 30-minute discovery call. We’ll map out where I can save you the
            most time and what results to aim for.
          </p>

          <ul className="booking__expect">
            <li>
              <CalendarDays size={18} aria-hidden="true" /> Free 30-minute discovery call
            </li>
            <li>
              <Clock size={18} aria-hidden="true" /> I reply within 24 hours to confirm
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" /> Clear proposal, no obligation
            </li>
          </ul>

          <p className="booking__alt">Prefer to message directly?</p>
          <div className="booking__contact">
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost booking__wa">
              <SocialIcon name="whatsapp" size={17} /> WhatsApp {profile.whatsappDisplay}
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <Mail size={17} aria-hidden="true" /> {profile.email}
            </a>
          </div>
          <ul className="booking__socials" aria-label="Social profiles">
            {socials
              .filter((s) => s.name !== 'whatsapp')
              .map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={`Avenier on ${s.label}`}>
                    <SocialIcon name={s.name} size={18} />
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="booking__panel card">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="done"
                className="booking__done"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={48} aria-hidden="true" />
                <h3>Request ready, {values.name.split(' ')[0]}!</h3>
                <p>
                  {WEB3FORMS_KEY
                    ? `Your booking request was sent. I’ll confirm your ${values.date} ${values.time} slot at ${values.email} within 24 hours.`
                    : `Your email app should have opened with your booking details. Just hit send and I’ll confirm within 24 hours. If nothing opened, email me at ${profile.email}.`}
                </p>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setValues(initial)
                    setTouched({})
                    setErrors({})
                    setStatus('idle')
                  }}
                >
                  Book another time
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} className="booking__form" exit={{ opacity: 0 }}>
                {errorList.length > 1 && (
                  <div className="booking__summary" role="alert" tabIndex={-1} ref={summaryRef}>
                    <strong>Please fix {errorList.length} fields:</strong>
                    <ul>
                      {errorList.map(([k, msg]) => (
                        <li key={k}>
                          <a href={`#bk-${k}`}>{labels[k]}</a>: {msg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="booking__row">
                  <Field id="name" label="Full name" required error={fieldError('name')}>
                    <input
                      id="bk-name"
                      autoComplete="name"
                      value={values.name}
                      onChange={set('name')}
                      onBlur={blur('name')}
                      aria-invalid={!!fieldError('name')}
                      aria-describedby={fieldError('name') ? 'bk-name-err' : undefined}
                    />
                  </Field>
                  <Field id="email" label="Email" required error={fieldError('email')}>
                    <input
                      id="bk-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={values.email}
                      onChange={set('email')}
                      onBlur={blur('email')}
                      aria-invalid={!!fieldError('email')}
                      aria-describedby={fieldError('email') ? 'bk-email-err' : undefined}
                    />
                  </Field>
                </div>

                <div className="booking__row">
                  <Field id="company" label="Company / brand" hint="Optional">
                    <input id="bk-company" autoComplete="organization" value={values.company} onChange={set('company')} />
                  </Field>
                  <Field id="service" label="What do you need help with?" required error={fieldError('service')}>
                    <select
                      id="bk-service"
                      value={values.service}
                      onChange={set('service')}
                      onBlur={blur('service')}
                      aria-invalid={!!fieldError('service')}
                      aria-describedby={fieldError('service') ? 'bk-service-err' : undefined}
                    >
                      <option value="">Select a service…</option>
                      {bookingServices.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="booking__row">
                  <Field id="date" label="Preferred date" required error={fieldError('date')}>
                    <input
                      id="bk-date"
                      type="date"
                      min={minDate}
                      value={values.date}
                      onChange={set('date')}
                      onBlur={blur('date')}
                      aria-invalid={!!fieldError('date')}
                      aria-describedby={fieldError('date') ? 'bk-date-err' : undefined}
                    />
                  </Field>
                  <Field id="timezone" label="Your time zone" hint="Detected automatically, edit if needed">
                    <input id="bk-timezone" value={values.timezone} onChange={set('timezone')} />
                  </Field>
                </div>

                <fieldset
                  className="booking__slots"
                  aria-describedby={fieldError('time') ? 'bk-time-err' : undefined}
                  aria-invalid={!!fieldError('time')}
                >
                  <legend>
                    Preferred time <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </legend>
                  <div className="booking__slot-grid" id="bk-time">
                    {timeSlots.map((t) => (
                      <label key={t} className={`booking__slot ${values.time === t ? 'is-selected' : ''}`}>
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={values.time === t}
                          onChange={(e) => {
                            set('time')(e)
                            setTouched((x) => ({ ...x, time: true }))
                            setErrors(validate({ ...values, time: t }))
                          }}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                  {fieldError('time') && (
                    <p className="booking__error" id="bk-time-err">
                      {fieldError('time')}
                    </p>
                  )}
                </fieldset>

                <Field id="message" label="Tell me a bit about your project" hint="Optional">
                  <textarea
                    id="bk-message"
                    rows={4}
                    value={values.message}
                    onChange={set('message')}
                    placeholder="e.g. I run a Shopify store and need help with daily operations and weekly ad creatives."
                  />
                </Field>

                {status === 'error' && (
                  <p className="booking__error booking__error--block" role="alert">
                    Something went wrong sending your request. Please try again, or email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <button type="submit" className="btn btn-primary booking__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Request my call <Send size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, required, hint, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`bk-${id}`}>
        {label}
        {required && (
          <>
            {' '}
            <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
        {hint && <small>{hint}</small>}
      </label>
      {children}
      {error && (
        <p className="booking__error" id={`bk-${id}-err`}>
          {error}
        </p>
      )}
    </div>
  )
}
