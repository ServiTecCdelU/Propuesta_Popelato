'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Award, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { brands, reasons } from '@/lib/data'
import { SectionLabel, SplitWords } from './motion'

const reasonIcons = [Award, Truck, ShieldCheck]

export function WhyRopelato() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} id="tienda" className="relative overflow-hidden bg-carbon py-20 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel className="text-white/70">Por qué elegir Ropelato</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <SplitWords text="Construimos confianza" /> <SplitWords text="hace más de 40 años." className="text-lime" delay={0.2} />
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-white/70">
            Somos una empresa familiar entrerriana. Conocemos cada obra porque la vivimos con vos: asesoramiento, entrega y respaldo real.
          </p>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
            <motion.div className="absolute -inset-y-[15%] inset-x-0" style={{ y: reduce ? 0 : y }}>
              <Image src="/images/hero-3.png" alt="Depósito de materiales Ropelato" fill sizes="40vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
        <ol className="flex flex-col gap-4 lg:col-span-7">
          {reasons.map((r, i) => {
            const Icon = reasonIcons[i]
            return (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-lime/50 hover:bg-white/[0.06] md:p-10">
                  <span className="pointer-events-none absolute -right-2 -top-8 font-display text-[9rem] font-black leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-lime/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-lime text-carbon">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold md:text-3xl">{r.title}</h3>
                  <p className="mt-3 max-w-lg text-pretty leading-relaxed text-white/70">{r.copy}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function BrandRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} [--marquee-duration:45s] hover:[animation-play-state:paused]`}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((b) => (
              <li
                key={b}
                className="mx-3 flex h-24 w-48 items-center justify-center rounded-2xl border border-border bg-white font-display text-2xl font-black uppercase tracking-tight text-graphite/60 grayscale transition-all duration-300 hover:border-lime hover:text-carbon md:w-56"
              >
                {b}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function Brands() {
  const half = Math.ceil(brands.length / 2)
  return (
    <section id="marcas" className="bg-mist py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center md:px-6">
        <SectionLabel className="justify-center text-graphite">Marcas</SectionLabel>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl font-black tracking-tight text-carbon md:text-5xl">
          <SplitWords text="Trabajamos con las mejores marcas." />
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <BrandRow items={brands.slice(0, half)} />
        <BrandRow items={brands.slice(half)} reverse />
      </div>
    </section>
  )
}
