import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            id: 'prod_1',
            name: 'Laptop Pro 15"',
            description: 'Laptop de alto rendimiento con procesador de ultima generacion, 16GB RAM, 512GB SSD. Pantalla Retina de 15 pulgadas con resolucion 4K. Ideal para desarrollo, diseno y gaming.',
            price: 1299.99,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
            stock: 15,
            category: 'Electronica',
        },
        {
            id: 'prod_2',
            name: 'Auriculares Wireless',
            description: 'Auriculares inalambricos con cancelacion de ruido activa. Bateria de 30 horas, sonido Hi-Fi, microfono integrado. Conexion Bluetooth 5.3 con multiples dispositivos.',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
            stock: 50,
            category: 'Electronica',
        },
        {
            id: 'prod_3',
            name: 'Zapatillas Running',
            description: 'Zapatillas deportivas de alto rendimiento con tecnologia de amortiguacion avanzada. Suela de goma antideslizante, malla transpirable y soporte para el arco del pie.',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
            stock: 30,
            category: 'Deportes',
        },
        {
            id: 'prod_4',
            name: 'Campera Invernal',
            description: 'Campera termica impermeable con relleno de plumon sintetico. Capucha desmontable, bolsillos con cierre y punos ajustables. Resistente al viento hasta -20C.',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop',
            stock: 20,
            category: 'Ropa',
        },
        {
            id: 'prod_5',
            name: 'Reloj Smart',
            description: 'Smartwatch con monitor cardiaco, GPS integrado, resistencia al agua IP68. Pantalla AMOLED de 1.4 pulgadas. Compatible con iOS y Android. Mas de 100 modos deportivos.',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
            stock: 25,
            category: 'Electronica',
        },
        {
            id: 'prod_6',
            name: 'Mochila Viajera',
            description: 'Mochila de viaje expandible con compartimento para laptop de 17 pulgadas. Material resistente al agua, multiples bolsillos organizadores y puerto USB integrado.',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
            stock: 40,
            category: 'Hogar',
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        })
    }

    console.log('Seed completado: 6 productos insertados')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
