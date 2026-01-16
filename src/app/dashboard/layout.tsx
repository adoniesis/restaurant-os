'use client'

import { useState } from 'react'
import { Sidebar, Header } from '@/components/layout/Sidebar'
import { ToastProvider } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <ToastProvider>
            <div className="min-h-screen bg-slate-50">
                {/* Sidebar */}
                <Sidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />

                {/* Mobile Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div
                    className={cn(
                        'transition-all duration-300',
                        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-[260px]'
                    )}
                >
                    {/* Header */}
                    <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

                    {/* Page Content */}
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ToastProvider>
    )
}
