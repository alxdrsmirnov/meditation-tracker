import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '../types/auth'

const STORAGE_KEY_TOKEN = 'auth_token'
const STORAGE_KEY_USER = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  function initFromStorage() {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN)
      const storedUser = localStorage.getItem(STORAGE_KEY_USER)

      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      }
    } catch (e) {
      console.error('Failed to restore auth from storage:', e)
      clearAuth()
    }
  }

  function saveAuth(newUser: User, newToken: string) {
    user.value = newUser
    token.value = newToken

    try {
      localStorage.setItem(STORAGE_KEY_TOKEN, newToken)
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser))
    } catch (e) {
      console.error('Failed to save auth to storage:', e)
    }
  }

  function clearAuth() {
    user.value = null
    token.value = null
    error.value = null

    try {
      localStorage.removeItem(STORAGE_KEY_TOKEN)
      localStorage.removeItem(STORAGE_KEY_USER)
    } catch (e) {
      console.error('Failed to clear auth from storage:', e)
    }
  }

  async function login(credentials: LoginCredentials): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        saveAuth(data.data.user, data.data.token)
        return true
      } else {
        error.value = data.message || 'Ошибка при входе'
        return false
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка сети'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterData): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok && result.status === 'success') {
        saveAuth(result.data.user, result.data.token)
        return true
      } else {
        error.value = result.message || 'Ошибка при регистрации'
        return false
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка сети'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    clearAuth()
  }

  function checkAuth(): boolean {
    return isAuthenticated.value
  }

  initFromStorage()

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }
})
