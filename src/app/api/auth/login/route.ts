import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const {email, password } = await req.json()

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 })
        }

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 })
        }

        const token = generateToken(user.id)

        return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    } catch {
        return NextResponse.json({ error: 'Error al iniciar sesion' }, { status: 500 })
    }
}