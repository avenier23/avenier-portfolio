import { brands, tools } from '../data/content'
import './Brands.css'

export default function Brands() {
  // Duplicated once so the CSS marquee loops seamlessly.
  const loop = [...tools, ...tools]
  return (
    <section className="brands" aria-label="Brands and tools I work with">
      <div className="container">
        <p className="brands__label">Brands I’ve created for</p>
        <ul className="brands__logos">
          {brands.map((b) => (
            <li key={b.name} className={`brands__logo ${b.dark ? 'is-dark' : ''}`}>
              <img src={b.logo} alt={b.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>

      <div className="marquee" aria-label="Tools I use">
        <ul className="marquee__track">
          {loop.map((t, i) => (
            <li key={`${t}-${i}`} aria-hidden={i >= tools.length ? 'true' : undefined}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
