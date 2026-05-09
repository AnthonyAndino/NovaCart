import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json()

        const existingUser = await prisma.user.findUnique({ where: { email }})
        if (existingUser) {
            return NextResponse.json({ error: 'Email ya registrado' }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })

        const token = generateToken(user.id)

        return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } })
    } catch {
        return NextResponse.json({ error: 'Error al registrar '}, { status: 500 })
    }
}