'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CreditCard, Truck } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { instagramPosts, paymentMethods } from '@/lib/data'
import { InstagramIcon } from './brand'
import { Magnetic, Reveal, SectionLabel, SplitWords } from './motion'

export function OnlineStore() {
  return (
    <section aria-labelledby="tienda-title" className="bg-white pb-20 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-lime p-8 md:p-14">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-carbon/5" />
          <div aria-hidden="true" className="absolute -bottom-32 right-32 size-64 rounded-full border-[30px] border-white/20" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <SectionLabel className="text-carbon/70">Tienda online</SectionLabel>
              <h2 id="tienda-title" className="mt-4 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-carbon md:text-6xl">
                <SplitWords text="Comprá online," /> <SplitWords text="envío gratis." className="text-white [text-shadow:0_2px_0_var(--carbon)]" delay={0.15} />
              </h2>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-carbon">
                <span className="flex items-center gap-2">
                  <Truck className="size-5" /> Envío gratis en Entre Ríos
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="size-5" /> Hasta 6 cuotas sin interés
                </span>
              </div>
              <Magnetic className="mt-8">
                <a
                  href="#promociones"
                  className="group flex items-center gap-2 rounded-full bg-carbon px-7 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-carbon"
                >
                  Ir a la tienda
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-carbon/70">Medios de pago</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {paymentMethods.map((m, i) => (
                  <motion.li
                    key={m}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex h-14 items-center justify-center rounded-2xl bg-white px-3 text-center text-sm font-bold text-carbon shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    {m}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Post({ post, index }: { post: (typeof instagramPosts)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [30, -30] : [-10, 10])

  return (
    <motion.a
      ref={ref}
      href="https://www.instagram.com/ropelatodm"
      target="_blank"
      rel="noreferrer"
      style={reduce ? undefined : { y }}
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-white/5"
    >
      <Image src={post.image} alt={post.alt} fill sizes="(min-width: 768px) 16vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 flex items-center justify-center bg-carbon/0 transition-colors duration-300 group-hover:bg-carbon/50">
        <InstagramIcon className="size-8 scale-50 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
      </span>
    </motion.a>
  )
}

export function Instagram() {
  return (
    <section aria-labelledby="ig-title" className="overflow-hidden bg-carbon py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel className="text-white/70">Instagram</SectionLabel>
            <h2 id="ig-title" className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">
              <SplitWords text="@ropelatodm" className="text-lime" />
            </h2>
            <p className="mt-2 text-lg text-white/70">26 mil seguidores construyendo con nosotros.</p>
          </div>
          <Magnetic>
            <a
              href="https://www.instagram.com/ropelatodm"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-carbon transition-colors hover:bg-white"
            >
              <InstagramIcon className="size-5" />
              Seguinos
            </a>
          </Magnetic>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
          {instagramPosts.map((p, i) => (
            <li key={p.image + i}>
              <Post post={p} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
