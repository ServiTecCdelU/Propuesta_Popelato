'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { marqueeCategories, stats } from '@/lib/data'
import { Reveal } from './motion'

export function CategoryMarquee() {
  const items = [...marqueeCategories, ...marqueeCategories]
  return (
    <div className="overflow-hidden border-y border-carbon bg-lime py-5" aria-label="Rubros Ropelato">
      <div className="flex w-max animate-marquee [--marquee-duration:35s] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <li key={`${item}-${i}`} className="flex items-center font-display text-3xl font-black uppercase tracking-tight text-carbon md:text-5xl">
                <span className="px-6">{item}</span>
                <svg viewBox="0 0 24 24" className="size-6 text-coral md:size-8" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.6-6.2-4.6-6.2 4.6 2.4-7.6L2 9.6h7.6z" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section aria-label="Ropelato en números" className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 md:grid-cols-4 md:px-6">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className="border-border px-2 py-10 md:border-l md:px-8 md:py-16 md:first:border-l-0 [&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-0"
          >
            <p className="font-display text-5xl font-black tracking-tight text-carbon md:text-7xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-graphite md:text-base">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
