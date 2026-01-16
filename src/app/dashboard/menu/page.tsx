'use client'

import { useState } from 'react'
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    GripVertical,
    Image as ImageIcon,
    ChevronRight,
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface Category {
    id: string
    name: string
    icon: string
    productCount: number
    active: boolean
    order: number
}

interface Product {
    id: string
    name: string
    description: string
    price: number
    image?: string
    categoryId: string
    available: boolean
    stock?: number
    preparationTime?: number
}

// ===== Mock Data =====

const mockCategories: Category[] = [
    { id: '1', name: 'Hamburguesas', icon: '🍔', productCount: 8, active: true, order: 1 },
    { id: '2', name: 'Pizzas', icon: '🍕', productCount: 6, active: true, order: 2 },
    { id: '3', name: 'Bebidas', icon: '🥤', productCount: 12, active: true, order: 3 },
    { id: '4', name: 'Postres', icon: '🍰', productCount: 5, active: true, order: 4 },
    { id: '5', name: 'Ensaladas', icon: '🥗', productCount: 4, active: false, order: 5 },
]

const mockProducts: Product[] = [
    { id: '1', name: 'Hamburguesa Clásica', description: 'Carne 150g, lechuga, tomate, cebolla', price: 18000, categoryId: '1', available: true, stock: 25, preparationTime: 15 },
    { id: '2', name: 'Hamburguesa Doble', description: 'Doble carne 300g, queso cheddar, tocineta', price: 28000, categoryId: '1', available: true, stock: 18, preparationTime: 20 },
    { id: '3', name: 'Hamburguesa BBQ', description: 'Carne 150g, salsa BBQ, aros de cebolla', price: 22000, categoryId: '1', available: true, stock: 15, preparationTime: 15 },
    { id: '4', name: 'Pizza Margarita', description: 'Tomate, mozzarella, albahaca fresca', price: 32000, categoryId: '2', available: true, stock: 10, preparationTime: 25 },
    { id: '5', name: 'Pizza Pepperoni', description: 'Pepperoni, mozzarella, orégano', price: 35000, categoryId: '2', available: true, stock: 8, preparationTime: 25 },
    { id: '6', name: 'Coca Cola 400ml', description: 'Bebida carbonatada', price: 3500, categoryId: '3', available: true, stock: 50 },
    { id: '7', name: 'Limonada Natural', description: 'Limonada recién exprimida', price: 5000, categoryId: '3', available: true, stock: 30 },
    { id: '8', name: 'Brownie con Helado', description: 'Brownie de chocolate con helado de vainilla', price: 12000, categoryId: '4', available: false, stock: 0, preparationTime: 10 },
]

// ===== Components =====

function CategoryCard({ category, onEdit, onToggle }: {
    category: Category
    onEdit: () => void
    onToggle: () => void
}) {
    return (
        <div className={cn(
            'flex items-center gap-3 p-4 bg-white rounded-lg border transition-all',
            category.active
                ? 'border-slate-200 hover:border-brand-primary'
                : 'border-slate-200 bg-slate-50 opacity-60'
        )}>
            <button className="cursor-grab text-slate-300 hover:text-slate-400">
                <GripVertical className="w-5 h-5" />
            </button>

            <span className="text-2xl">{category.icon}</span>

            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900">{category.name}</h3>
                <p className="text-xs text-slate-500">{category.productCount} productos</p>
            </div>

            <button
                onClick={onToggle}
                className={cn(
                    'p-2 rounded-lg transition-colors',
                    category.active
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-slate-400 hover:bg-slate-100'
                )}
                title={category.active ? 'Desactivar' : 'Activar'}
            >
                {category.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>

            <button
                onClick={onEdit}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
            >
                <Edit className="w-5 h-5" />
            </button>
        </div>
    )
}

function ProductCard({ product, onEdit, onToggle }: {
    product: Product
    onEdit: () => void
    onToggle: () => void
}) {
    const isLowStock = product.stock !== undefined && product.stock < 10

    return (
        <div className={cn(
            'bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md',
            product.available ? 'border-slate-200' : 'border-slate-200 opacity-60'
        )}>
            {/* Image */}
            <div className="aspect-video bg-slate-100 relative">
                {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon className="w-12 h-12" />
                    </div>
                )}

                {!product.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            AGOTADO
                        </span>
                    </div>
                )}

                {isLowStock && product.available && (
                    <div className="absolute top-2 right-2">
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Stock: {product.stock}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mt-1">{product.description}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-brand-primary">{formatPrice(product.price)}</span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={onToggle}
                            className={cn(
                                'p-1.5 rounded-lg transition-colors',
                                product.available
                                    ? 'text-green-600 hover:bg-green-50'
                                    : 'text-slate-400 hover:bg-slate-100'
                            )}
                        >
                            {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={onEdit}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function MenuPage() {
    const [categories, setCategories] = useState(mockCategories)
    const [products, setProducts] = useState(mockProducts)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [view, setView] = useState<'categories' | 'products'>('products')

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || product.categoryId === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleProductAvailability = (productId: string) => {
        setProducts(prev =>
            prev.map(p => p.id === productId ? { ...p, available: !p.available } : p)
        )
    }

    const toggleCategoryActive = (categoryId: string) => {
        setCategories(prev =>
            prev.map(c => c.id === categoryId ? { ...c, active: !c.active } : c)
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Menú</h1>
                    <p className="text-slate-500">
                        {categories.length} categorías • {products.length} productos
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn-primary">
                        <Plus className="w-5 h-5" />
                        Agregar Producto
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex gap-6">
                    <button
                        onClick={() => setView('products')}
                        className={cn(
                            'pb-3 text-sm font-medium border-b-2 transition-colors',
                            view === 'products'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        )}
                    >
                        Productos
                    </button>
                    <button
                        onClick={() => setView('categories')}
                        className={cn(
                            'pb-3 text-sm font-medium border-b-2 transition-colors',
                            view === 'categories'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        )}
                    >
                        Categorías
                    </button>
                </nav>
            </div>

            {view === 'products' ? (
                <>
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                                    !selectedCategory
                                        ? 'bg-brand-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                Todos
                            </button>
                            {categories.filter(c => c.active).map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={cn(
                                        'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                                        selectedCategory === category.id
                                            ? 'bg-brand-primary text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    )}
                                >
                                    {category.icon} {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => console.log('Edit product', product.id)}
                                onToggle={() => toggleProductAvailability(product.id)}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <p>No se encontraron productos</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Categories Header */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Arrastra para reordenar las categorías
                        </p>
                        <button className="btn-secondary">
                            <Plus className="w-5 h-5" />
                            Nueva Categoría
                        </button>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onEdit={() => console.log('Edit category', category.id)}
                                onToggle={() => toggleCategoryActive(category.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
