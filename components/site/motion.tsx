'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...props
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnView = true,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  animateOnView?: boolean
}) {
  const words = text.split(' ')
  const trigger = animateOnView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' }
  return (
    <motion.span
      className={cn('inline', className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function Magnetic({ children, className, strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * strength)
        y.set((e.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]', className)}>
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      {children}
    </span>
  )
}
