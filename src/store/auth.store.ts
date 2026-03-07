import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY_TOKEN = 'auth_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function initFromStorage() {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN)
      if (storedToken) {
        token.value = storedToken
      }
    } catch (e) {
      console.error('Failed to restore auth from storage:', e)
      clearToken()
    }
  }

  function setToken(newToken: string) {
    token.value = newToken
    try {
      localStorage.setItem(STORAGE_KEY_TOKEN, newToken)
    } catch (e) {
      console.error('Failed to save token to storage:', e)
    }
  }

  function getToken(): string | null {
    return token.value
  }

  function clearToken() {
    token.value = null
    error.value = null
    try {
      localStorage.removeItem(STORAGE_KEY_TOKEN)
    } catch (e) {
      console.error('Failed to clear token from storage:', e)
    }
  }

  async function login(credentials: { username: string; password: string }): Promise<boolean> {
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
        setToken(data.data.token)
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

  async function register(data: { email: string; username: string; password: string }): Promise<boolean> {
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
        setToken(result.data.token)
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
    clearToken()
  }

  initFromStorage()

  return {
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    getToken,
    setToken,
    clearToken
  }
})
