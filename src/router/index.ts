import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'meditations',
    component: MainPage
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('../pages/StatisticsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
