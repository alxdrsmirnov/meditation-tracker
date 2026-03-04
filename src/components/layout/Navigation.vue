<script setup lang="ts">
import PlayIcon from '../../icons/PlayIcon.vue'
import StatsIcon from '../../icons/StatsIcon.vue'
import DoorOpenIcon from '../../icons/DoorOpenIcon.vue'
</script>

<template>
  <nav class="navigation">
    <router-link to="/" class="nav-item" active-class="active">
      <PlayIcon />
      <span>Медитация</span>
    </router-link>
    
    <div class="separator"></div>
    
    <router-link to="/stats" class="nav-item">
      <StatsIcon />
      <span>Статистика</span>
    </router-link>
    
    <div class="separator"></div>
    
    <a href="#" class="nav-item">
      <DoorOpenIcon />
      <span>Выход</span>
    </a>
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
