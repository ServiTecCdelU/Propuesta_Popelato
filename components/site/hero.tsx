'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { heroChips, heroSlides, whatsappUrl } from '@/lib/data'
import { WhatsappIcon } from './brand'
import { Magnetic, SplitWords } from './motion'

const SLIDE_MS = 6500

export function Hero() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, paused, reduce])

  const go = (dir: number) => setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length)
  const slide = heroSlides[index]

  return (
    <section
      id="inicio"
      ref={ref}
      aria-roledescription="carrusel"
      aria-label="Destacados Ropelato"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-carbon text-white"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: reduce ? 0 : imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' }}
            >
              <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/55 to-carbon/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/70 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-4 pb-14 pt-32 md:px-6 md:pb-20"
      >
        <div className="mb-6 flex items-center gap-3 text-sm font-medium text-white/80">
          <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">+40 años</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.kicker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {slide.kicker}
            </motion.span>
          </AnimatePresence>
        </div>

        <h1 className="max-w-4xl text-balance font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          <SplitWords text="Productos para construir, remodelar o" animateOnView={false} delay={1} />{' '}
          <SplitWords text="ampliar tu hogar." className="text-lime" animateOnView={false} delay={1.35} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-lg"
        >
          +40 años construyendo con vos en Entre Ríos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href={whatsappUrl('Hola, quiero cotizar materiales para mi obra.')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-carbon transition-colors hover:bg-white"
            >
              <WhatsappIcon className="size-4" />
              Cotizá tu obra
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#productos"
              className="group flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-carbon"
            >
              Ver productos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 2 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {heroChips.map((chip) => (
            <motion.li
              key={chip}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md md:text-sm"
            >
              {chip}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-12 flex items-center gap-4 md:gap-6">
          <p className="font-display text-sm font-bold tabular-nums" aria-live="polite">
            <span className="text-lime">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-white/50"> / {String(heroSlides.length).padStart(2, '0')}</span>
          </p>
          <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Seleccionar imagen">
            {heroSlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Imagen ${i + 1}: ${s.kicker}`}
                onClick={() => setIndex(i)}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20"
              >
                {i < index && <span className="absolute inset-0 bg-white/70" />}
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-lime"
                    initial={{ width: paused || reduce ? '100%' : '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused || reduce ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={() => go(-1)} className="rounded-full border border-white/30 p-2 hover:bg-white hover:text-carbon">
              <ChevronLeft className="size-4" />
              <span className="sr-only">Anterior</span>
            </button>
            <button type="button" onClick={() => setPaused((p) => !p)} className="rounded-full border border-white/30 p-2 hover:bg-white hover:text-carbon">
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              <span className="sr-only">{paused ? 'Reanudar' : 'Pausar'}</span>
            </button>
            <button type="button" onClick={() => go(1)} className="rounded-full border border-white/30 p-2 hover:bg-white hover:text-carbon">
              <ChevronRight className="size-4" />
              <span className="sr-only">Siguiente</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
