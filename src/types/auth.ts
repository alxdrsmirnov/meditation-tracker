export interface User {
  id: number
  email: string
  username: string
  avatarUrl?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface AuthResponse {
  status: string
  data: {
    user: User
    token: string
  }
}
