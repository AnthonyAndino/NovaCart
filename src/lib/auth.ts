import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d'})
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    } catch {
        return null
    }
}