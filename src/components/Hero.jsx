import { motion } from 'motion/react'
import { ArrowRight, Play, Sparkles, TrendingUp } from 'lucide-react'
import { heroStats, profile } from '../data/content'
import './Hero.css'

const spring = { type: 'spring', stiffness: 80, damping: 18 }

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p
            className="hero__badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <span className="hero__pulse" aria-hidden="true" />
            Available for new clients · {profile.timezones}
          </motion.p>

          <motion.h1
            id="hero-title"
            className="hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 }}
          >
            <span className="hero__role">Virtual Assistant</span>
            <span className="hero__role hero__role--accent">
              E-commerce <span className="hero__amp">&amp;</span>
            </span>
            <span className="hero__role">Digital Creative</span>
          </motion.h1>

          <motion.p
            className="hero__text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.16 }}
          >
            I’m <strong>Avenier</strong>. I help entrepreneurs and growing brands streamline operations, run
            their online stores and create high-impact content, from Kickstarter ad creatives to reels that
            actually get watched.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.24 }}
          >
            <a href="#book" className="btn btn-primary">
              Work with me <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#work" className="btn btn-ghost">
              <Play size={16} aria-hidden="true" /> View my work
            </a>
          </motion.div>

          <motion.dl
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {heroStats.map((s) => (
              <div key={s.value} className="hero__stat">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="hero__stat-value">{s.value}</span>
                  <span className="hero__stat-label">{s.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring hero__ring--2" aria-hidden="true" />
          <div className="hero__glow" aria-hidden="true" />
          <img
            src="/media/img/profile-cutout.webp"
            alt="Avenier Arellano in a black blazer and navy shirt"
            className="hero__photo"
            width="900"
            height="1350"
            fetchPriority="high"
          />

          <motion.div
            className="hero__float hero__float--top card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.5 }}
          >
            <span className="hero__float-icon" aria-hidden="true">
              <TrendingUp size={18} />
            </span>
            <span>
              <strong>8,083% funded</strong>
              <small>Bolt 205W Kickstarter</small>
            </span>
          </motion.div>

          <motion.div
            className="hero__float hero__float--bottom card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.65 }}
          >
            <span className="hero__float-icon hero__float-icon--cyan" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <span>
              <strong>39K views</strong>
              <small>57.9% watched to the end</small>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
