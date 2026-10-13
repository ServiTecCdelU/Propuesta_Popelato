'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { formatARS, products, promoCampaigns, type Product } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'
import { Reveal, SectionLabel, SplitWords } from './motion'

const toneClasses: Record<(typeof promoCampaigns)[number]['tone'], string> = {
  lime: 'bg-lime text-carbon',
  carbon: 'bg-carbon text-white',
  coral: 'bg-coral text-white',
  mist: 'bg-mist text-carbon',
  graphite: 'bg-graphite text-white',
}

function ProductCard({ product }: { product: Product }) {
  const { add, favorites, toggleFavorite } = useCart()
  const [added, setAdded] = useState(false)
  const discount = product.listPrice ? Math.round((1 - product.price / product.listPrice) * 100) : 0
  const fav = favorites.has(product.name)
  const installment = Math.round(product.price / 6)

  return (
    <article className="group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(43,43,43,0.35)] md:w-80">
      <div className="relative aspect-square overflow-hidden bg-mist">
        <Image src={product.image} alt={product.name} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {discount > 0 && <span className="rounded-full bg-coral px-3 py-1 text-xs font-bold text-white">-{discount}%</span>}
          {product.tag && <span className="rounded-full bg-carbon px-3 py-1 text-xs font-bold text-white">{product.tag}</span>}
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(product.name)}
          aria-pressed={fav}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={cn('size-5 transition-colors', fav ? 'fill-coral text-coral' : 'text-carbon')} />
          <span className="sr-only">{fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-graphite">{product.category}</p>
        <h3 className="mt-1 text-pretty font-semibold leading-snug text-carbon">{product.name}</h3>
        <div className="mt-auto pt-4">
          {product.listPrice && <p className="text-sm text-graphite line-through">{formatARS(product.listPrice)}</p>}
          <p className="font-display text-2xl font-black text-carbon">{formatARS(product.price)}</p>
          <p className="text-xs text-lime-deep font-semibold">6 cuotas sin interés de {formatARS(installment)}</p>
          <button
            type="button"
            onClick={() => {
              add()
              setAdded(true)
              setTimeout(() => setAdded(false), 1400)
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-carbon py-3 text-sm font-semibold text-white transition-colors hover:bg-lime hover:text-carbon"
          >
            <ShoppingCart className="size-4" />
            {added ? '¡Agregado!' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  )
}

export function Promotions() {
  const scroller = useRef<HTMLUListElement>(null)
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  return (
    <section id="promociones" className="overflow-hidden bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionLabel className="text-graphite">Promociones</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-black leading-[1.05] tracking-tight text-carbon md:text-6xl">
          <SplitWords text="Precios que construyen." />
        </h2>

        <ul className="no-scrollbar mt-10 flex gap-3 overflow-x-auto pb-2">
          {promoCampaigns.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="shrink-0"
            >
              <a
                href="#promociones"
                className={cn('group flex h-full w-64 flex-col justify-between gap-6 rounded-3xl p-6 transition-transform hover:-translate-y-1', toneClasses[c.tone])}
              >
                <span className="font-display text-2xl font-black uppercase leading-none tracking-tight">{c.title}</span>
                <span className="flex items-end justify-between gap-3 text-sm opacity-90">
                  {c.copy}
                  <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-extrabold text-carbon md:text-3xl">Destacados de la semana</h3>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} className="rounded-full border border-border p-3 hover:border-carbon hover:bg-carbon hover:text-white">
              <ChevronLeft className="size-5" />
              <span className="sr-only">Anterior</span>
            </button>
            <button type="button" onClick={() => scrollBy(1)} className="rounded-full border border-border p-3 hover:border-carbon hover:bg-carbon hover:text-white">
              <ChevronRight className="size-5" />
              <span className="sr-only">Siguiente</span>
            </button>
          </div>
        </div>
        <Reveal>
          <ul ref={scroller} className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 md:-mx-6 md:px-6">
            {products.map((p) => (
              <li key={p.name} className="flex">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
