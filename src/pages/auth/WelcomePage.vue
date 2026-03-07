<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/auth/AuthLayout.vue'

const router = useRouter()

const handleEnterApp = () => {
  router.push('/login')
}
</script>

<template>
  <AuthLayout>
    <div class="welcome-container">
      <h1 class="welcome-title">Добро пожаловать!</h1>
      <p class="welcome-subtitle">
        Медитируй и оставайся в фокусе,<br />
        чтобы быть счастливым.
      </p>
      <button class="enter-button" @click="handleEnterApp">
        Войти в приложение
      </button>
    </div>
  </AuthLayout>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  flex-shrink: 0;
}

.welcome-title {
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 20px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.welcome-subtitle {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 40px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.enter-button {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-primary);
  font-family: var(--font-family-sans);
  font-size: 20px;
  font-weight: 600;
  padding: 18px 48px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.enter-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.enter-button:active {
  transform: translateY(0);
}
</style>
