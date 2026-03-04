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
    
    <router-link to="/stats" class="nav-item" active-class="active">
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
  gap: var(--spacing-unit);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: var(--text-color-secondary);
  text-decoration: none;
  font-family: var(--font-family-sans);
  font-size: 14px;
  transition: color 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  color: var(--text-color-primary);
}

.nav-item.active {
  color: var(--text-color-primary);
}

.separator {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
