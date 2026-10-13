'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import {
  Bath,
  BrickWall,
  Cable,
  Columns3,
  Grid3x3,
  Heart,
  Layers,
  LayoutPanelTop,
  Menu,
  Package,
  PanelsTopLeft,
  Search,
  ShoppingCart,
  Tag,
  User,
  X,
  Zap,
} from 'lucide-react'

const Icons = { Bath, BrickWall, Cable, Columns3, Grid3x3, Layers, LayoutPanelTop, Package, PanelsTopLeft, Tag, Zap }
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { mainNav, quickCategories, shopNav, socials, whatsappUrl } from '@/lib/data'
import { Logo, socialIcons, WhatsappIcon } from './brand'
import { useCart } from './cart-context'
import { Magnetic } from './motion'

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, favorites } = useCart()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        scrolled ? 'bg-white/80 shadow-[0_8px_30px_-12px_rgba(43,43,43,0.25)] backdrop-blur-xl' : 'bg-white',
      )}
    >
      <motion.div
        initial={false}
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden bg-carbon text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs md:px-6">
          <p className="truncate">
            Hasta <span className="font-semibold text-lime">6 cuotas sin interés</span> y{' '}
            <span className="font-semibold text-lime">envío gratis!</span>
          </p>
          <ul className="hidden items-center gap-3 sm:flex">
            {socials.map((s) => {
              const Icon = socialIcons[s.name]
              return (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="block text-white/70 transition-colors hover:text-lime">
                    <Icon className="size-4" />
                    <span className="sr-only">{s.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:gap-8 md:px-6">
        <a href="#inicio" aria-label="Ropelato, ir al inicio" className="shrink-0">
          <Logo />
        </a>

        <form role="search" className="relative hidden flex-1 md:block" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="site-search" className="sr-only">
            Buscar productos
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Buscar productos o marcas"
            className="h-11 w-full rounded-full border border-border bg-mist pl-5 pr-12 text-sm outline-none transition-colors placeholder:text-graphite focus:border-lime focus:bg-white"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-full bg-lime text-carbon transition-transform hover:scale-105"
          >
            <Search className="size-4" />
            <span className="sr-only">Buscar</span>
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <a href="#contacto" className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-medium leading-tight hover:bg-mist xl:flex">
            <User className="size-5" />
            <span className="flex flex-col">
              <span>Iniciar sesión</span>
              <span className="text-graphite">Crear cuenta</span>
            </span>
          </a>
          <button type="button" className="relative rounded-full p-2.5 hover:bg-mist" aria-label={`Favoritos (${favorites.size})`}>
            <Heart className="size-5" />
            {favorites.size > 0 && (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                {favorites.size}
              </span>
            )}
          </button>
          <button type="button" className="relative rounded-full p-2.5 hover:bg-mist" aria-label={`Carrito (${count} productos)`}>
            <ShoppingCart className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-lime text-[10px] font-bold text-carbon"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Magnetic className="hidden sm:block">
            <a
              href={whatsappUrl('Hola, quiero cotizar materiales.')}
              target="_blank"
              rel="noreferrer"
              className="ml-2 flex items-center gap-2 rounded-full bg-carbon px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lime hover:text-carbon"
            >
              <WhatsappIcon className="size-4" />
              Cotizar por WhatsApp
            </a>
          </Magnetic>
          <button
            type="button"
            className="rounded-full p-2.5 hover:bg-mist lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </div>

      <nav aria-label="Principal" className="hidden bg-lime lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6">
          <a href="#productos" className="flex items-center gap-2 bg-carbon px-5 py-3 text-sm font-bold uppercase tracking-wider text-white">
            <Menu className="size-4" />
            Productos
          </a>
          <ul className="flex items-center gap-6 text-sm font-semibold text-carbon">
            {shopNav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="relative py-3 after:absolute after:inset-x-0 after:-bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-carbon after:transition-transform hover:after:scale-x-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="ml-auto flex items-center gap-5 text-sm text-carbon/80">
            {mainNav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-colors hover:text-carbon">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="hidden overflow-hidden border-b border-border md:block"
      >
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 md:px-6">
          {quickCategories.map((c) => {
            const Icon = Icons[c.icon]
            return (
              <li key={c.label} className="shrink-0">
                <a
                  href="#productos"
                  className="group flex w-24 flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-center text-[11px] font-medium leading-tight text-graphite transition-colors hover:bg-mist hover:text-carbon"
                >
                  <Icon className="size-6 stroke-[1.4] transition-transform group-hover:-translate-y-0.5 group-hover:text-lime-deep" />
                  {c.label}
                </a>
              </li>
            )
          })}
        </ul>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <nav aria-label="Menú móvil" className="flex flex-col gap-1 px-4 py-4">
              <form role="search" className="mb-3 md:hidden" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="mobile-search" className="sr-only">
                  Buscar productos
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="¿Qué estás buscando?"
                  className="h-11 w-full rounded-full border border-border bg-mist px-5 text-sm outline-none focus:border-lime"
                />
              </form>
              {[...mainNav, ...shopNav].map((item, i) => (
                <motion.a
                  key={`${item.label}-${i}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-lg px-3 py-2.5 font-display text-lg font-bold hover:bg-mist"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={whatsappUrl('Hola, quiero cotizar materiales.')}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-lime px-4 py-3 font-semibold text-carbon"
              >
                <WhatsappIcon className="size-5" />
                Cotizar por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
