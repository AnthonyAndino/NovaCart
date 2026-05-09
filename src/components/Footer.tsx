    export default function Footer() {
        return (
            <footer className="bg-gray-800 text-white mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">NovaCart</h3>
                            <p className="text-gray-400">Tu tienda online de confianza</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Terminos</a></li>
                                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Contacto</h3>
                            <p className="text-gray-400">info@novacart.com</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        © 2026 NovaCart. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        )
    }