'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { branches, PHONE_HREF } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Reveal, SectionLabel, SplitWords } from './motion'

function SchematicMap({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-carbon md:aspect-square">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true" preserveAspectRatio="none">
        <motion.path
          d="M14 18 L40 12 L62 16 L84 22 L90 40 L88 58 L84 76 L78 90 L58 92 L40 86 L26 72 L18 54 L10 36 Z"
          fill="#ffffff0d"
          stroke="var(--lime)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <path d="M84 22 Q92 50 86 70 T78 92" fill="none" stroke="var(--sky)" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M14 18 Q6 40 18 56 T40 88" fill="none" stroke="var(--sky)" strokeWidth="0.8" strokeOpacity="0.6" />
        {branches.map((b, i) =>
          i === 0 ? null : (
            <motion.line
              key={b.city}
              x1={branches[0].x}
              y1={branches[0].y}
              x2={b.x}
              y2={b.y}
              stroke="var(--lime)"
              strokeWidth="0.35"
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1 + i * 0.2 }}
            />
          ),
        )}
      </svg>
      <span className="absolute right-[5%] top-[46%] origin-center rotate-90 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky/80">
        Río Uruguay
      </span>
      <span className="absolute bottom-[38%] left-[4%] -rotate-[70deg] text-[10px] font-semibold uppercase tracking-[0.3em] text-sky/80">
        Río Paraná
      </span>
      <p className="absolute left-6 top-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60">Entre Ríos</p>
      <p className="absolute bottom-5 left-6 text-[11px] text-white/40">Mapa esquemático ilustrativo</p>

      {branches.map((b, i) => (
        <button
          key={b.city}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={active === i}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          <span className="relative flex size-4 items-center justify-center">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-lime" />
            <span className={cn('relative size-4 rounded-full border-2 border-carbon transition-colors', active === i ? 'bg-lime' : 'bg-white')} />
          </span>
          <span
            className={cn(
              'absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-colors',
              active === i ? 'bg-lime text-carbon' : 'bg-white/10 text-white backdrop-blur group-hover:bg-white/20',
            )}
          >
            {b.city}
          </span>
        </button>
      ))}
    </div>
  )
}

export function Branches() {
  const [active, setActive] = useState(0)

  return (
    <section id="sucursales" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionLabel className="text-graphite">Sucursales</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-black leading-[1.05] tracking-tight text-carbon md:text-6xl">
          <SplitWords text="Tres sucursales," /> <SplitWords text="una sola Ropelato." className="text-lime-deep" delay={0.15} />
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <SchematicMap active={active} onSelect={setActive} />
          </Reveal>
          <ul className="flex flex-col gap-4">
            {branches.map((b, i) => (
              <Reveal key={b.city} delay={i * 0.1}>
                <li>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      'w-full rounded-3xl border p-6 text-left transition-all duration-500 md:p-8',
                      active === i ? 'border-carbon bg-carbon text-white shadow-xl' : 'border-border bg-mist hover:border-carbon/40',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={cn('text-xs font-semibold uppercase tracking-[0.2em]', active === i ? 'text-lime' : 'text-graphite')}>
                          {b.label}
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-extrabold md:text-3xl">{b.city}</h3>
                      </div>
                      <span className={cn('font-display text-4xl font-black', active === i ? 'text-lime' : 'text-carbon/15')}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <dl className={cn('mt-5 grid gap-2 text-sm', active === i ? 'text-white/80' : 'text-graphite')}>
                      <div className="flex items-start gap-2">
                        <dt>
                          <MapPin className="mt-0.5 size-4 shrink-0" />
                          <span className="sr-only">Dirección</span>
                        </dt>
                        <dd>
                          {b.address}, {b.city}
                        </dd>
                      </div>
                      <div className="flex items-start gap-2">
                        <dt>
                          <Clock className="mt-0.5 size-4 shrink-0" />
                          <span className="sr-only">Horario</span>
                        </dt>
                        <dd>{b.hours}</dd>
                      </div>
                      <div className="flex items-start gap-2">
                        <dt>
                          <Phone className="mt-0.5 size-4 shrink-0" />
                          <span className="sr-only">Teléfono</span>
                        </dt>
                        <dd>{b.phone}</dd>
                      </div>
                    </dl>
                  </button>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-graphite">
          ¿Dudas sobre una sucursal? Llamanos al{' '}
          <a href={PHONE_HREF} className="font-semibold text-sky underline-offset-4 hover:underline">
            03442-43-3300
          </a>
          .
        </p>
      </div>
    </section>
  )
}
