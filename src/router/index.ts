import { createRouter, createWebHistory } from 'vue-router'
import MeditationsPage from '../pages/MeditationsPage.vue'

const routes = [
  {
    path: '/',
    name: 'meditations',
    component: MeditationsPage
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
