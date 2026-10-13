'use client'

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from './brand'

export function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (hover: hover)')
    const update = () => setEnabled(media.matches && !reduce)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHovering(Boolean(target?.closest('a, button, [role="button"], label, input, select, textarea')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 rounded-full border-2 border-lime mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 56 : 32, height: hovering ? 56 : 32, backgroundColor: hovering ? 'rgba(168,209,66,0.25)' : 'rgba(168,209,66,0)' }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-lime"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  )
}

export function Grain() {
  return <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.045] mix-blend-multiply" />
}

export function IntroCurtain() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 0 : 900)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-lime"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Logo className="scale-150" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
