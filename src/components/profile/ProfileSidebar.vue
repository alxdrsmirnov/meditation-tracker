<script setup lang="ts">
import { useProfileStore } from '../../store/profile.store'
import MoodSelector from './MoodSelector.vue'

const profileStore = useProfileStore()
</script>

<template>
  <aside class="profile-sidebar">
    <div class="profile-header">
      <img
        :src="profileStore.user.avatarUrl"
        :alt="profileStore.user.name"
        class="avatar"
      />

      <h1 class="greeting">Добро пожаловать, {{ profileStore.user.name }}!</h1>
      <p class="question">Как вы сегодня себя чувствуете?</p>
    </div>
    
    <MoodSelector />
  </aside>
</template>

<style scoped>
.profile-sidebar {
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
  min-width: 320px;
}

.profile-header {
  margin-bottom: var(--spacing-unit);
}

.avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: calc(var(--spacing-unit) * 2);
  border: 4px solid #C4A265;
  padding: 4px;
  box-sizing: content-box;
}

.greeting {
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 36px;
  font-weight: 600;
  margin-bottom: -6px;
}

.question {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 20px;
  margin-bottom: 44px;
}
</style>
