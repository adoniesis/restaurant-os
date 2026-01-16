'use client'

import { useState } from 'react'
import {
    MessageCircle,
    Users,
    Send,
    MoreVertical,
    Search,
    Phone,
    Video,
    Check,
    CheckCheck,
    Paperclip,
    Smile,
    Mic,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Mock Data =====

const conversations = [
    {
        id: '1',
        name: 'Juan Pérez',
        lastMessage: '¿Tienen servicio a domicilio?',
        time: '12:30 PM',
        unread: 2,
        avatar: 'JP',
        online: true,
    },
    {
        id: '2',
        name: 'María López',
        lastMessage: 'Gracias, todo estuvo delicioso',
        time: '11:45 AM',
        unread: 0,
        avatar: 'ML',
        online: false,
    },
    {
        id: '3',
        name: 'Carlos Ruiz',
        lastMessage: 'Confirmado el pago por Nequi',
        time: 'Yesterday',
        unread: 0,
        avatar: 'CR',
        online: false,
    },
]

const messages = [
    { id: '1', text: 'Hola, buenas tardes', sender: 'user', time: '12:28 PM', status: 'read' },
    { id: '2', text: '¡Hola! Bienvenido a Restaurante La Delicia 🍔\n¿En qué podemos ayudarte?', sender: 'bot', time: '12:28 PM', status: 'read' },
    { id: '3', text: '¿Tienen servicio a domicilio?', sender: 'user', time: '12:30 PM', status: 'delivered' },
]

// ===== Components =====

export default function WhatsAppChatPage() {
    const [selectedChat, setSelectedChat] = useState(conversations[0])
    const [msgInput, setMsgInput] = useState('')

    return (
        <div className="h-[calc(100vh-2rem)] flex bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
                <div className="p-4 border-b border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-slate-800 text-lg">Chats</h2>
                        <div className="flex gap-2 text-slate-500">
                            <MessageCircle className="w-5 h-5 cursor-pointer hover:text-green-600" />
                            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-slate-800" />
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar conversación..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={cn(
                                "p-4 flex gap-3 cursor-pointer hover:bg-slate-100 transition-colors border-b border-slate-100",
                                selectedChat.id === chat.id ? "bg-slate-100" : "bg-white"
                            )}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium">
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-slate-900 truncate">{chat.name}</h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                                    {chat.unread > 0 && (
                                        <span className="bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ml-2">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#efeae2]">

                {/* Header */}
                <div className="px-6 py-3 bg-[#f0f2f5] border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium">
                            {selectedChat.avatar}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{selectedChat.name}</h3>
                            <p className="text-xs text-slate-500">en línea hoy a las 12:30 PM</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-slate-500">
                        <Search className="w-5 h-5 cursor-pointer hover:text-slate-800" />
                        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-slate-800" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                    {messages.map(msg => (
                        <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-start" : "justify-end")}>
                            <div className={cn(
                                "max-w-[70%] p-3 rounded-lg shadow-sm relative text-sm",
                                msg.sender === 'user'
                                    ? "bg-white rounded-tl-none text-slate-900"
                                    : "bg-[#d9fdd3] rounded-tr-none text-slate-900"
                            )}>
                                <p className="whitespace-pre-line">{msg.text}</p>
                                <div className="flex justify-end items-center gap-1 mt-1">
                                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                                    {msg.sender === 'bot' && (
                                        <CheckCheck className="w-3 h-3 text-blue-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#f0f2f5] flex items-center gap-3">
                    <Smile className="w-6 h-6 text-slate-500 cursor-pointer hover:text-slate-700" />
                    <Paperclip className="w-6 h-6 text-slate-500 cursor-pointer hover:text-slate-700" />
                    <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-2 border-none focus-within:ring-1 focus-within:ring-green-500">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje"
                            className="flex-1 border-none focus:ring-0 text-sm"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                        />
                    </div>
                    {msgInput.trim() ? (
                        <Send className="w-6 h-6 text-slate-500 cursor-pointer hover:text-green-600" />
                    ) : (
                        <Mic className="w-6 h-6 text-slate-500 cursor-pointer hover:text-slate-700" />
                    )}
                </div>

            </div>
        </div>
    )
}
