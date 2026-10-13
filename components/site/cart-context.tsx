'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type CartState = {
  count: number
  favorites: Set<string>
  add: () => void
  toggleFavorite: (id: string) => void
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set())

  const add = useCallback(() => setCount((c) => c + 1), [])
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const value = useMemo(() => ({ count, favorites, add, toggleFavorite }), [count, favorites, add, toggleFavorite])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
