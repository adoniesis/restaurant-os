'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { Menu, Bell } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar - Desktop */}
            <div className={`hidden lg:block transition-all duration-300 ${isSidebarCollapsed ? 'pl-[70px]' : 'pl-[260px]'}`}>
                <AdminSidebar
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-[260px]">
                        <AdminSidebar
                            isCollapsed={false}
                            onToggle={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-[260px]'} ml-0`}>
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-slate-900 hidden sm:block">
                            Panel de Administración
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">Admin General</p>
                                <p className="text-xs text-slate-500">superadmin@restaurantos.com</p>
                            </div>
                            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                SA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
