'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { mainNav, paymentMethods, PHONE_DISPLAY, PHONE_HREF, socials, WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/data'
import { Logo, socialIcons, WhatsappIcon } from './brand'
import { Magnetic, Reveal, SectionLabel, SplitWords } from './motion'

const fieldClass =
  'h-14 w-full rounded-2xl border border-border bg-white px-5 text-carbon outline-none transition-colors placeholder:text-graphite/70 focus:border-lime focus:ring-4 focus:ring-lime/20'

export function ContactCta() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const need = String(data.get('need') ?? '').trim()
    const message = `Hola, soy ${name} (tel. ${phone}). Quiero un presupuesto para: ${need}`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="bg-mist py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel className="text-graphite">Contacto</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-black leading-[1] tracking-tight text-carbon sm:text-5xl md:text-6xl">
            <SplitWords text="¿Tenés una obra?" /> <SplitWords text="Te la presupuestamos." className="text-lime-deep" delay={0.2} />
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg text-graphite">
            Contanos qué necesitás y te respondemos por WhatsApp con un presupuesto a medida.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-carbon">
            <a href={PHONE_HREF} className="flex items-center gap-3 font-semibold hover:text-lime-deep">
              <span className="flex size-11 items-center justify-center rounded-full bg-white">
                <Phone className="size-5" />
              </span>
              {PHONE_DISPLAY}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-semibold hover:text-lime-deep">
              <span className="flex size-11 items-center justify-center rounded-full bg-white">
                <WhatsappIcon className="size-5" />
              </span>
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>

        <Reveal>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(43,43,43,0.35)] md:p-10">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-carbon">
                Nombre
              </label>
              <input id="name" name="name" required autoComplete="name" placeholder="Tu nombre" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-carbon">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="[0-9+\-\s()]{6,}"
                placeholder="03442 ..."
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="need" className="mb-2 block text-sm font-semibold text-carbon">
                ¿Qué necesitás?
              </label>
              <textarea
                id="need"
                name="need"
                required
                rows={4}
                maxLength={800}
                placeholder="Ej: materiales para un baño de 2x3 m, cerámicos, sanitarios y grifería."
                className={`${fieldClass} h-auto py-4`}
              />
            </div>
            <Magnetic className="mt-2 w-full" strength={0.15}>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 font-semibold text-carbon transition-colors hover:bg-carbon hover:text-white"
              >
                <WhatsappIcon className="size-5" />
                Pedir presupuesto por WhatsApp
              </button>
            </Magnetic>
            <p className="text-center text-xs text-graphite">Se abrirá WhatsApp con tu consulta lista para enviar.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <div className="flex flex-col justify-between gap-6 rounded-3xl bg-white/[0.04] p-6 md:flex-row md:items-center md:p-10">
      <div>
        <h2 className="font-display text-2xl font-extrabold md:text-3xl">Suscribite a novedades de Ropelato</h2>
        <p className="mt-1 text-white/60">Ofertas, lanzamientos y promos bancarias en tu correo.</p>
      </div>
      <form
        className="flex w-full max-w-md gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setDone(true)
        }}
      >
        <label htmlFor="newsletter" className="sr-only">
          Email
        </label>
        <input
          id="newsletter"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white outline-none placeholder:text-white/40 focus:border-lime"
        />
        <button type="submit" className="flex h-12 items-center gap-2 rounded-full bg-lime px-6 font-semibold text-carbon transition-colors hover:bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(done)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
              {done ? <Check className="size-4" /> : <Send className="size-4" />}
              {done ? '¡Listo!' : 'Suscribir'}
            </motion.span>
          </AnimatePresence>
        </button>
      </form>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Newsletter />

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Materiales para construir, remodelar o ampliar tu hogar. +40 años en Entre Ríos.
            </p>
          </div>
          <nav aria-label="Menú rápido">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Menú</h3>
            <ul className="mt-4 grid gap-2 text-sm text-white/70">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Contacto</h3>
            <ul className="mt-4 grid gap-2 text-sm text-white/70">
              <li>
                <a href={PHONE_HREF} className="hover:text-white">
                  Tel. {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="hover:text-white">
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-lime">Redes</h3>
            <ul className="mt-4 grid gap-2 text-sm text-white/70">
              {socials.map((s) => {
                const Icon = socialIcons[s.name]
                return (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
                      <Icon className="size-4" />
                      {s.handle}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Medios de pago</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((m) => (
                <li key={m} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/70">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Ropelato · Hecho con <span className="text-coral">♥</span> en Entre Ríos
          </p>
          <a href="#inicio" className="flex items-center gap-2 hover:text-white">
            Volver arriba <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
      <p aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap text-center font-display text-[22vw] font-black leading-[0.8] tracking-tighter text-white/[0.03]">
        ROPELATO
      </p>
    </footer>
  )
}

export function WhatsappFloat() {
  return (
    <a
      href={whatsappUrl('Hola, ¿en qué podemos ayudarte?')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
    >
      <span className="absolute -inset-1 animate-pulse rounded-full border-2 border-[#25D366]/50" aria-hidden="true" />
      <WhatsappIcon className="relative size-7" />
      <span className="sr-only">Escribinos por WhatsApp</span>
    </a>
  )
}
