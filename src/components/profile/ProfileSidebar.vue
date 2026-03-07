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
  padding: 32px 32px 32px 48px;
  min-width: 280px;
}

.profile-header {
  margin-bottom: 16px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 24px;
}

.greeting {
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 28px;
  font-weight: 600;
  margin-bottom: -12px;
}

.question {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 18px;
  margin-bottom: 32px;
}
</style>
