'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import Link from 'next/link'
import {
    ShoppingCart,
    Plus,
    Minus,
    X,
    Search,
    MapPin,
    Phone,
    Clock,
    ChevronRight,
    MessageCircle,
    Trash2,
    Tag,
} from 'lucide-react'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface Product {
    id: string
    name: string
    description: string
    price: number
    image?: string
    categoryId: string
    available: boolean
    preparationTime?: number
}

interface Category {
    id: string
    name: string
    icon: string
    productCount: number
}

interface CartItem {
    product: Product
    quantity: number
    modifiers?: string[]
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

// ===== Mock Data =====

const restaurantInfo = {
    name: 'Restaurante La Delicia',
    logo: '🍔',
    phone: '+57 300 123 4567',
    address: 'Cra 45 #28-15, Medellín',
    hours: 'Lun-Dom: 8am - 10pm',
    deliveryCost: 5000,
    freeDeliveryMin: 50000,
    whatsappNumber: '573001234567',
}

const categories: Category[] = [
    { id: '1', name: 'Hamburguesas', icon: '🍔', productCount: 5 },
    { id: '2', name: 'Pizzas', icon: '🍕', productCount: 4 },
    { id: '3', name: 'Bebidas', icon: '🥤', productCount: 6 },
    { id: '4', name: 'Postres', icon: '🍰', productCount: 3 },
    { id: '5', name: 'Combos', icon: '🍟', productCount: 3 },
]

const products: Product[] = [
    { id: '1', name: 'Hamburguesa Clásica', description: 'Carne 150g, lechuga, tomate, cebolla, salsa especial', price: 18000, categoryId: '1', available: true, preparationTime: 15 },
    { id: '2', name: 'Hamburguesa Doble', description: 'Doble carne 300g, queso cheddar, tocineta crujiente', price: 28000, categoryId: '1', available: true, preparationTime: 20 },
    { id: '3', name: 'Hamburguesa BBQ', description: 'Carne 150g, salsa BBQ, aros de cebolla, queso', price: 22000, categoryId: '1', available: true, preparationTime: 15 },
    { id: '4', name: 'Hamburguesa Veggie', description: 'Medallón de lentejas, vegetales frescos, mayonesa vegana', price: 20000, categoryId: '1', available: true, preparationTime: 15 },
    { id: '5', name: 'Hamburguesa Premium', description: 'Carne angus 200g, queso brie, champiñones salteados', price: 35000, categoryId: '1', available: false, preparationTime: 25 },
    { id: '6', name: 'Pizza Margarita', description: 'Tomate, mozzarella fresca, albahaca', price: 32000, categoryId: '2', available: true, preparationTime: 25 },
    { id: '7', name: 'Pizza Pepperoni', description: 'Pepperoni, mozzarella, orégano', price: 35000, categoryId: '2', available: true, preparationTime: 25 },
    { id: '8', name: 'Pizza 4 Quesos', description: 'Mozzarella, gorgonzola, parmesano, provolone', price: 38000, categoryId: '2', available: true, preparationTime: 25 },
    { id: '9', name: 'Coca Cola 400ml', description: 'Bebida carbonatada', price: 3500, categoryId: '3', available: true },
    { id: '10', name: 'Limonada Natural', description: 'Limonada recién exprimida con hierbabuena', price: 5000, categoryId: '3', available: true },
    { id: '11', name: 'Malteada Chocolate', description: 'Helado de vainilla, chocolate, crema batida', price: 12000, categoryId: '3', available: true },
    { id: '12', name: 'Brownie con Helado', description: 'Brownie de chocolate con helado de vainilla y salsa de chocolate', price: 15000, categoryId: '4', available: true, preparationTime: 10 },
    { id: '13', name: 'Combo Clásico', description: 'Hamburguesa Clásica + Papas + Bebida', price: 28000, categoryId: '5', available: true, preparationTime: 20 },
    { id: '14', name: 'Combo Familiar', description: '2 Hamburguesas + 2 Papas + 4 Bebidas', price: 65000, categoryId: '5', available: true, preparationTime: 30 },
]

// ===== Cart Context =====

const CartContext = createContext<CartContextType | undefined>(undefined)

function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Error loading cart:', e)
            }
        }
    }, [])

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = useCallback((product: Product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { product, quantity }]
        })
    }, [])

    const removeItem = useCallback((productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId))
    }, [])

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }, [removeItem])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}

// ===== Components =====

function Header() {
    const { itemCount } = useCart()
    const [showCart, setShowCart] = useState(false)

    return (
        <>
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">{restaurantInfo.logo}</span>
                        <div>
                            <h1 className="font-bold text-slate-900 text-sm">{restaurantInfo.name}</h1>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Abierto ahora
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowCart(true)}
                        className="relative p-2 bg-brand-primary text-white rounded-full"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Cart Drawer */}
            <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
        </>
    )
}

function CategoryScroller({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
    return (
        <div className="sticky top-[60px] z-30 bg-white border-b border-slate-100 py-3">
            <div className="max-w-lg mx-auto px-4">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button
                        onClick={() => onSelect(null)}
                        className={cn(
                            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                            !selected
                                ? 'bg-brand-primary text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                    >
                        ✨ Todos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={cn(
                                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                                selected === cat.id
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            )}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart()

    return (
        <div className={cn(
            'bg-white rounded-xl border border-slate-200 overflow-hidden flex gap-3 p-3',
            !product.available && 'opacity-60'
        )}>
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center relative">
                <span className="text-4xl">
                    {categories.find(c => c.id === product.categoryId)?.icon}
                </span>
                {!product.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <span className="text-xs font-bold text-white">AGOTADO</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-slate-900 text-sm leading-tight">{product.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-brand-primary">{formatPrice(product.price)}</span>
                    {product.available && (
                        <button
                            onClick={() => addItem(product)}
                            className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart()
    const [couponCode, setCouponCode] = useState('')

    const deliveryCost = total >= restaurantInfo.freeDeliveryMin ? 0 : restaurantInfo.deliveryCost
    const grandTotal = total + deliveryCost

    const handleWhatsAppCheckout = () => {
        const itemsText = items
            .map(item => `• ${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}`)
            .join('\n')

        const message = `🍔 *NUEVO PEDIDO*

📋 *Productos:*
${itemsText}

📦 Subtotal: ${formatPrice(total)}
🚚 Domicilio: ${deliveryCost === 0 ? 'GRATIS' : formatPrice(deliveryCost)}
💰 *TOTAL: ${formatPrice(grandTotal)}*

📍 Mi dirección: [Tu dirección]
📞 Mi teléfono: [Tu número]

¡Gracias!`

        const url = getWhatsAppUrl(restaurantInfo.whatsappNumber, message)
        window.open(url, '_blank')
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-xl animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">Mi Carrito ({itemCount})</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <ShoppingCart className="w-16 h-16 mb-4" />
                        <p className="text-lg font-medium">Tu carrito está vacío</p>
                        <p className="text-sm">Agrega productos para continuar</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {items.map(item => (
                            <div key={item.product.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                                    {categories.find(c => c.id === item.product.categoryId)?.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-slate-900 text-sm truncate">{item.product.name}</h4>
                                    <p className="text-sm font-bold text-brand-primary">
                                        {formatPrice(item.product.price * item.quantity)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="p-1 text-red-400 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-slate-200 p-4 space-y-4">
                        {/* Coupon */}
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Código de cupón"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg"
                                />
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-brand-primary border border-brand-primary rounded-lg hover:bg-blue-50">
                                Aplicar
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Domicilio</span>
                                <span className={deliveryCost === 0 ? 'text-green-600 font-medium' : ''}>
                                    {deliveryCost === 0 ? 'GRATIS' : formatPrice(deliveryCost)}
                                </span>
                            </div>
                            {deliveryCost > 0 && (
                                <p className="text-xs text-green-600">
                                    ¡Domicilio gratis en pedidos mayores a {formatPrice(restaurantInfo.freeDeliveryMin)}!
                                </p>
                            )}
                            <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t">
                                <span>Total</span>
                                <span>{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <button
                            onClick={handleWhatsAppCheckout}
                            className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Continuar en WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

function InfoBar() {
    return (
        <div className="bg-gradient-to-r from-brand-primary to-blue-600 text-white py-2 px-4">
            <div className="max-w-lg mx-auto flex items-center justify-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {restaurantInfo.hours}
                </span>
                <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {restaurantInfo.phone}
                </span>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function CatalogoPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProducts = products.filter(product => {
        const matchesCategory = !selectedCategory || product.categoryId === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <CartProvider>
            <div className="min-h-screen bg-slate-50 pb-24">
                <InfoBar />
                <Header />

                {/* Banner promo */}
                <div className="max-w-lg mx-auto px-4 py-4">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
                        <h2 className="text-lg font-bold">🔥 ¡Domicilio GRATIS!</h2>
                        <p className="text-sm opacity-90">En pedidos mayores a {formatPrice(restaurantInfo.freeDeliveryMin)}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="max-w-lg mx-auto px-4 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>
                </div>

                {/* Categories */}
                <CategoryScroller selected={selectedCategory} onSelect={setSelectedCategory} />

                {/* Products */}
                <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
                    {categories
                        .filter(cat => !selectedCategory || cat.id === selectedCategory)
                        .map(category => {
                            const categoryProducts = filteredProducts.filter(p => p.categoryId === category.id)
                            if (categoryProducts.length === 0) return null

                            return (
                                <div key={category.id}>
                                    <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        {category.icon} {category.name}
                                    </h2>
                                    <div className="space-y-3">
                                        {categoryProducts.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                </div>

                {/* Restaurant Info */}
                <div className="max-w-lg mx-auto px-4 py-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <h3 className="font-bold text-slate-900 mb-3">📍 Información</h3>
                        <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2 text-slate-600">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {restaurantInfo.address}
                            </p>
                            <p className="flex items-center gap-2 text-slate-600">
                                <Phone className="w-4 h-4 text-slate-400" />
                                {restaurantInfo.phone}
                            </p>
                            <p className="flex items-center gap-2 text-slate-600">
                                <Clock className="w-4 h-4 text-slate-400" />
                                {restaurantInfo.hours}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    )
}
