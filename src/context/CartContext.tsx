"use client"
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    stock: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'novacart-cart'

function loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return []
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

function saveCartToStorage(items: CartItem[]) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
        // localStorage full or unavailable — silent fail
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [hydrated, setHydrated] = useState(false)

    // Hydrate from localStorage on mount (client only)
    useEffect(() => {
        setItems(loadCartFromStorage())
        setHydrated(true)
    }, [])

    // Persist to localStorage whenever items change (after hydration)
    useEffect(() => {
        if (hydrated) {
            saveCartToStorage(items)
        }
    }, [items, hydrated])

    const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
                        : item
                )
            }
            return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }]
        })
    }, [])

    const removeFromCart = useCallback((id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(item => item.id !== id))
            return
        }
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.min(quantity, item.stock) }
                    : item
            )
        )
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const getCartTotal = useCallback(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [items])

    const getCartCount = useCallback(() => {
        return items.reduce((count, item) => count + item.quantity, 0)
    }, [items])

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
