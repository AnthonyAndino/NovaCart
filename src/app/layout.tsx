import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'NovaCart',
    description: 'NovaCart - E-commerce platform',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}
