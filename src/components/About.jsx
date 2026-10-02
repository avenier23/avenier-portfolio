import { MapPin, Clock, FileDown, Languages } from 'lucide-react'
import Reveal from './Reveal'
import { about, profile } from '../data/content'
import './About.css'

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
