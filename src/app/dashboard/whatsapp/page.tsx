'use client'

import { useState } from 'react'
import {
    MessageCircle,
    Settings,
    Bot,
    MessageSquare,
    Save,
    Plus,
    Trash2,
    Play,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Types =====

interface BotFlow {
    id: string
    trigger: string
    response: string
    enabled: boolean
}

// ===== Mock Data =====

const initialFlows: BotFlow[] = [
    { id: '1', trigger: 'hola', response: '¡Hola! Bienvenid@ a Restaurante La Delicia 🍔. ¿En qué te podemos ayudar hoy?\n\n1. Ver Menú\n2. Hacer Pedido\n3. Hablar con asesor', enabled: true },
    { id: '2', trigger: '1', response: '¡Claro! Mira nuestro menú aquí: https://restauranteos.app/catalogo', enabled: true },
    { id: '3', trigger: '2', response: 'Para pedir, ingresa a nuestro catálogo y selecciona tus productos favoritos: https://restauranteos.app/catalogo', enabled: true },
    { id: '4', trigger: 'menú', response: '¡Claro! Mira nuestro menú aquí: https://restauranteos.app/catalogo', enabled: true },
    { id: '5', trigger: 'horario', response: 'Abrimos de Lunes a Domingo de 11:00 AM a 10:00 PM 🕙', enabled: true },
    { id: '6', trigger: 'direccion', response: 'Estamos ubicados en la Cra 45 #28-15, Medellín 📍', enabled: true },
]

// ===== Components =====

function FlowCard({ flow, onDelete, onToggle }: { flow: BotFlow; onDelete: () => void; onToggle: () => void }) {
    return (
        <div className={cn(
            'bg-white rounded-xl border p-4 transition-all',
            flow.enabled ? 'border-brand-primary/50 shadow-sm' : 'border-slate-200 opacity-60'
        )}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-600">
                        Si usuario escribe:
                    </div>
                    <span className="font-bold text-slate-900">"{flow.trigger}"</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={flow.enabled} onChange={onToggle} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                    <button onClick={onDelete} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-line border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1">Bot responde:</span>
                {flow.response}
            </div>
        </div>
    )
}

function ChatSimulator({ flows }: { flows: BotFlow[] }) {
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: 'Escribe "hola" para probar el bot', isBot: true }
    ])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return

        // User message
        const userMsg = input.toLowerCase().trim()
        setMessages(prev => [...prev, { text: input, isBot: false }])
        setInput('')

        // Bot logic
        setTimeout(() => {
            const activeFlow = flows.find(f => f.enabled && f.trigger.toLowerCase() === userMsg)

            if (activeFlow) {
                setMessages(prev => [...prev, { text: activeFlow.response, isBot: true }])
            } else {
                setMessages(prev => [...prev, { text: 'Lo siento, no entendí ese comando. Escribe "hola" para ver las opciones.', isBot: true }])
            }
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[500px]">
            <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold">Restaurante La Delicia</h3>
                    <p className="text-xs text-white/80">En línea</p>
                </div>
            </div>

            <div className="flex-1 bg-[#E5DDD5] p-4 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={cn('flex', msg.isBot ? 'justify-start' : 'justify-end')}>
                        <div className={cn(
                            'max-w-[80%] rounded-lg p-3 text-sm shadow-sm relative',
                            msg.isBot
                                ? 'bg-white rounded-tl-none text-slate-900'
                                : 'bg-[#DCF8C6] rounded-tr-none text-slate-900'
                        )}>
                            {msg.text}
                            <span className="block text-[10px] text-right mt-1 opacity-60">12:00</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-3 bg-[#F0F0F0] flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
                <button
                    onClick={handleSend}
                    className="w-10 h-10 bg-[#075E54] text-white rounded-full flex items-center justify-center hover:bg-[#128C7E]"
                >
                    <Play className="w-4 h-4 fill-current" />
                </button>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function WhatsAppConfigPage() {
    const [flows, setFlows] = useState<BotFlow[]>(initialFlows)
    const [newFlow, setNewFlow] = useState({ trigger: '', response: '' })
    const [isAdding, setIsAdding] = useState(false)

    const handleAddFlow = () => {
        if (!newFlow.trigger || !newFlow.response) return

        setFlows(prev => [...prev, {
            id: Date.now().toString(),
            trigger: newFlow.trigger,
            response: newFlow.response,
            enabled: true
        }])
        setNewFlow({ trigger: '', response: '' })
        setIsAdding(false)
    }

    const handleDelete = (id: string) => {
        setFlows(prev => prev.filter(f => f.id !== id))
    }

    const handleToggle = (id: string) => {
        setFlows(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                        Configuración del Bot
                    </h1>
                    <p className="text-slate-500">Configura las respuestas automáticas de tu restaurante</p>
                </div>
                <button className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Editor Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                Flujos de Conversación
                            </h2>
                            {!isAdding && (
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="text-sm font-medium text-brand-primary flex items-center gap-1 hover:underline"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nuevo Flujo
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {isAdding && (
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl animate-in fade-in slide-in-from-top-4">
                                    <h3 className="font-semibold text-blue-900 mb-3">Nuevo Mensaje Automático</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-blue-800 mb-1 block">Si el cliente escribe:</label>
                                            <input
                                                type="text"
                                                placeholder="Ej: horario, menu, direccion..."
                                                value={newFlow.trigger}
                                                onChange={e => setNewFlow({ ...newFlow, trigger: e.target.value })}
                                                className="w-full rounded-lg border-blue-200 text-sm p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-blue-800 mb-1 block">El bot responde:</label>
                                            <textarea
                                                placeholder="Escribe la respuesta..."
                                                value={newFlow.response}
                                                onChange={e => setNewFlow({ ...newFlow, response: e.target.value })}
                                                rows={3}
                                                className="w-full rounded-lg border-blue-200 text-sm p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <button
                                                onClick={() => setIsAdding(false)}
                                                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-white rounded-lg transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleAddFlow}
                                                className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Guardar Flujo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {flows.map(flow => (
                                <FlowCard
                                    key={flow.id}
                                    flow={flow}
                                    onDelete={() => handleDelete(flow.id)}
                                    onToggle={() => handleToggle(flow.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Simulator Section */}
                <div className="lg:sticky lg:top-6 space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Simulador en Vivo
                    </h2>
                    <p className="text-sm text-slate-500">Prueba tus flujos aquí antes de publicar.</p>
                    <ChatSimulator flows={flows} />
                </div>

            </div>
        </div>
    )
}
