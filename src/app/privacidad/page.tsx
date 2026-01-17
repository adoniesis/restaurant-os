import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-brand-primary font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Inicio
                    </Link>
                    <span className="font-bold text-slate-900">RestaurantOS</span>
                </div>
            </header>

            <main className="flex-1 py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Política de Privacidad</h1>
                        <p className="text-slate-500">En cumplimiento con la Ley 1581 de 2012 (Colombia)</p>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">1. Responsable del Tratamiento</h3>
                            <p>
                                <strong>Adoniesis Serna Hinestroza</strong>, domiciliado en Medellín, Colombia, es el responsable del tratamiento de los datos personales recolectados a través de RestaurantOS.
                                <br />
                                <strong>Contacto:</strong> adoniesis2010@gmail.com
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">2. Datos que Recopilamos</h3>
                            <p>Recolectamos información necesaria para la prestación del servicio, incluyendo:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Datos de identificación (Nombre, Documento de identidad).</li>
                                <li>Datos de contacto (Email, Teléfono/WhatsApp, Dirección).</li>
                                <li>Información comercial del restaurante (Menú, Precios, Horarios).</li>
                                <li>Datos transaccionales relacionados con pedidos y suscripciones.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">3. Finalidad del Tratamiento</h3>
                            <p>Los datos se utilizarán para:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Proveer y gestionar los servicios de la plataforma SaaS.</li>
                                <li>Procesar pagos y facturación.</li>
                                <li>Enviar notificaciones sobre pedidos, actualizaciones o seguridad.</li>
                                <li>Mejorar la experiencia de usuario y soporte técnico.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">4. Derechos del Titular (Habeas Data)</h3>
                            <p>Usted tiene derecho a:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                                <li>Solicitar prueba de la autorización otorgada.</li>
                                <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios legales.</li>
                                <li>Acceder en forma gratuita a sus datos personales.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">5. Seguridad de la Información</h3>
                            <p>
                                Implementamos medidas de seguridad técnicas, humanas y administrativas para evitar la adulteración, pérdida, consulta, uso o acceso no autorizado de su información. Utilizamos encriptación y protocolos seguros (SSL).
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
