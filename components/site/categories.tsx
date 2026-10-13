'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Reveal, SectionLabel, SplitWords } from './motion'

function CategoryCard({ item, index, featured }: { item: (typeof categories)[number]; index: number; featured: boolean }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className={cn('[perspective:1000px]', featured && 'sm:col-span-2 lg:row-span-2')}
    >
      <motion.a
        href="#promociones"
        style={reduce ? undefined : { rotateX, rotateY }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        className={cn(
          'group relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-3xl bg-carbon p-6 text-white',
          featured && 'lg:min-h-[34rem]',
        )}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-6 top-5 font-display text-sm font-bold text-white/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-lime group-hover:text-carbon">
          <ArrowUpRight className="size-5" />
        </span>
        <div className="relative">
          <h3 className={cn('text-balance font-display font-extrabold leading-tight', featured ? 'text-3xl md:text-4xl' : 'text-xl')}>
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-white/75">{item.detail}</p>
          <span className="mt-4 inline-flex translate-y-2 items-center gap-1 text-sm font-semibold text-lime opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Ver productos <ArrowUpRight className="size-4" />
          </span>
        </div>
      </motion.a>
    </Reveal>
  )
}

export function Categories() {
  return (
    <section id="productos" className="bg-mist py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <SectionLabel className="text-graphite">Categorías</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-black leading-[1.05] tracking-tight text-carbon md:text-6xl">
              <SplitWords text="Todo para tu obra." />
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-graphite">
            Desde la base de tu casa hasta la decoración final. Más de 10 rubros con las mejores marcas del país.
          </p>
        </div>
        <ul className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, i) => (
            <li key={item.title} className={cn('contents')}>
              <CategoryCard item={item} index={i} featured={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
