export interface User {
    id: string
    email: string
    name: string | null
    role: 'USER' | 'ADMIN'
}

export interface AuthResponse {
    token: string
    user: User
}
