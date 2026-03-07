import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './store/auth.store'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

// Инициализируем auth store для восстановления сессии из localStorage
const authStore = useAuthStore()
authStore.checkAuth()

app.use(router)
app.mount('#app')
