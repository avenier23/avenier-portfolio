import { motion } from 'motion/react'
import { fadeUp } from './motion'

// Fades + lifts children into view once. MotionConfig in App respects prefers-reduced-motion.
export default function Reveal({ children, delay = 0, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
