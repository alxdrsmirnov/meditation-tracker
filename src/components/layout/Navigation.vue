<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth.store'
import PlayIcon from '../../icons/PlayIcon.vue'
import StatsIcon from '../../icons/StatsIcon.vue'
import DoorOpenIcon from '../../icons/DoorOpenIcon.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isMeditationRoute = computed(() => {
  return route.name === 'meditations' || route.name === 'active-meditation'
})

const isStatsRoute = computed(() => {
  return route.name === 'stats'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/welcome')
}
</script>

<template>
  <nav class="navigation">
    <router-link to="/" :class="['nav-item', { active: isMeditationRoute }]">
      <PlayIcon />
      <span>Медитация</span>
    </router-link>
    
    <div class="separator"></div>
    
    <router-link to="/stats" :class="['nav-item', { active: isStatsRoute }]">
      <StatsIcon />
      <span>Статистика</span>
    </router-link>
    
    <div class="separator"></div>
    
    <button class="nav-item" @click="handleLogout">
      <DoorOpenIcon />
      <span>Выход</span>
    </button>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: var(--text-color-secondary);
  text-decoration: none;
  font-family: var(--font-family);
  font-size: 20px;
  transition: color 0.2s ease;
  cursor: pointer;
  background: none;
  border: none;
}

.nav-item:hover {
  color: var(--text-color-primary);
}

.nav-item.active {
  color: var(--text-color-primary);
}

.nav-item :deep(svg) {
  width: 28px;
  height: 28px;
  opacity: 0.7;
}

.nav-item.active :deep(svg) {
  opacity: 1;
}

.separator {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
