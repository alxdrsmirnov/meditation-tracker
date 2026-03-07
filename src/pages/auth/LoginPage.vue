<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth.store'
import AuthLayout from '../../components/auth/AuthLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

const isLoading = computed(() => authStore.loading)
const authError = computed(() => authStore.error)

const handleLogin = async () => {
  error.value = ''
  
  if (!username.value.trim()) {
    error.value = 'Введите имя пользователя'
    return
  }
  
  if (!password.value) {
    error.value = 'Введите пароль'
    return
  }
  
  const success = await authStore.login({
    username: username.value.trim(),
    password: password.value
  })
  
  if (success) {
    router.push('/')
  }
}

const handleGoToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <AuthLayout>
    <div class="login-container">
      <h1 class="page-title">Вход в приложение</h1>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="form-label">Имя пользователя</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            placeholder="Введите имя пользователя"
            :disabled="isLoading"
            autocomplete="username"
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Введите пароль"
            :disabled="isLoading"
            autocomplete="current-password"
          />
        </div>
        
        <div v-if="error || authError" class="error-message">
          {{ error || authError }}
        </div>
        
        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти в приложение' }}
        </button>
      </form>
      
      <div class="switch-form">
        <span class="switch-text">Нет аккаунта?</span>
        <button class="switch-link" @click="handleGoToRegister" :disabled="isLoading">
          Зарегистрироваться
        </button>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  flex-shrink: 0;
}

.page-title {
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 16px;
  font-weight: 400;
}

.form-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-small);
  padding: 14px 16px;
  color: var(--text-color-primary);
  font-family: var(--font-family-sans);
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input::placeholder {
  color: rgba(170, 178, 185, 0.5);
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #FF6B6B;
  font-family: var(--font-family-sans);
  font-size: 14px;
  text-align: center;
  padding: 8px;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: var(--border-radius-small);
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.submit-button {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-primary);
  font-family: var(--font-family-sans);
  font-size: 18px;
  font-weight: 600;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  margin-top: 8px;
}

.submit-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.switch-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.switch-text {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 16px;
}

.switch-link {
  background: none;
  border: none;
  color: #C4A265;
  font-family: var(--font-family-sans);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.switch-link:hover:not(:disabled) {
  color: #D4B275;
}

.switch-link:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
