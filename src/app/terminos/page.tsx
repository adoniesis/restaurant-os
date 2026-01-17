import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Simple Header */}
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
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Términos y Condiciones</h1>
                        <p className="text-slate-500">Última actualización: Enero 2025</p>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                1. Derechos de Propiedad Intelectual
                            </h3>
                            <p>
                                Todo el contenido, diseño, logotipos, gráficos y código fuente presentes en este sitio web son propiedad exclusiva de <strong>Adoniesis Serna Hinestroza</strong> ("El Propietario") y están protegidos por las leyes de derechos de autor de Colombia y tratados internacionales. Queda prohibida la reproducción, distribución o modificación sin autorización expresa por escrito.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                2. Licencia de Uso
                            </h3>
                            <p>
                                Se concede a los usuarios una licencia limitada, no exclusiva e intransferible para acceder y utilizar la plataforma RestaurantOS con el propósito de gestionar sus operaciones de restaurante, de acuerdo con el plan de suscripción contratado.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                3. Restricciones
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>No utilizar la plataforma para actividades ilegales o fraudulentas.</li>
                                <li>No intentar acceder al código fuente o realizar ingeniería inversa.</li>
                                <li>No compartir credenciales de acceso con terceros no autorizados.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                4. Limitación de Responsabilidad
                            </h3>
                            <p>
                                La plataforma se proporciona "tal cual". Adoniesis Serna Hinestroza no garantiza que el servicio sea ininterrumpido o libre de errores. No nos hacemos responsables por daños indirectos derivados del uso de la plataforma.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                5. Modificaciones
                            </h3>
                            <p>
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en esta página.
                            </p>
                        </section>

                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                            <p className="text-sm">
                                Para consultas legales, por favor contáctenos en: <br />
                                <strong>Email:</strong> adoniesis2010@gmail.com <br />
                                <strong>Ubicación:</strong> Medellín, Colombia
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
