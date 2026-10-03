import { useEffect, useRef, useState } from 'react'
import { MapPin, Clock, FileDown, Languages, Volume2, VolumeX } from 'lucide-react'
import Reveal from './Reveal'
import { about, profile } from '../data/content'
import './About.css'

// Muted, looping brand intro; starts when scrolled into view (never for reduced-motion users).
function IntroVideo() {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), {
      threshold: 0.4,
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className="about__intro">
      <video
        ref={ref}
        src={profile.introVideo.src}
        poster={profile.introVideo.poster}
        muted={muted}
        loop
        playsInline
        controls={!muted}
        preload="metadata"
        aria-label="Avenier’s 18-second brand intro video"
      />
      <button
        className="about__sound"
        onClick={() => {
          setMuted((m) => !m)
          ref.current?.play().catch(() => {})
        }}
        aria-label={muted ? 'Play intro with sound' : 'Mute intro'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <figcaption>My 18-sec intro</figcaption>
    </figure>
  )
}

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__photo-wrap">
          <img
            src="/media/img/profile-studio.webp"
            alt="Studio portrait of Avenier Arellano against a navy backdrop"
            className="about__photo"
            width="900"
            height="900"
            loading="lazy"
          />
          <IntroVideo />
          <ul className="about__facts card">
            <li>
              <MapPin size={16} aria-hidden="true" /> {profile.location}
            </li>
            <li>
              <Clock size={16} aria-hidden="true" /> Full-time · flexible hours
            </li>
            <li>
              <Languages size={16} aria-hidden="true" /> English (fluent) · Filipino (native)
            </li>
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">About Avenier</span>
            <h2 id="about-title" className="h2">
              The story behind my <span className="gradient-text">Virtual Assistant</span> career
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="lead">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.15}>
            <dl className="about__highlights">
              {about.highlights.map((h) => (
                <div key={h.label} className="about__highlight">
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="about__actions">
            <a href={profile.resume} download className="btn btn-primary">
              <FileDown size={18} aria-hidden="true" /> Download my résumé
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              View PDF
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
