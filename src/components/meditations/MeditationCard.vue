<script setup lang="ts">
import type { Meditation } from '../../types/meditation'
import PlayIcon from '../../icons/PlayIcon.vue'

defineProps<{
  meditation: Meditation
}>()
</script>

<template>
  <div class="meditation-card">
    <h3 class="title">{{ meditation.title }}</h3>
    <p class="description">{{ meditation.description }}</p>
    <div class="footer">
      <button class="start-button">
        <PlayIcon />
        <span>Начать</span>
      </button>
      <span class="duration">{{ meditation.duration_min }} мин</span>
    </div>
  </div>
</template>

<style scoped>
.meditation-card {
  background-color: #F5F5F0;
  border-radius: var(--border-radius-large);
  padding: calc(var(--spacing-unit) * 1.5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-unit);
  min-height: 180px;
}

.title {
  color: #253334;
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.description {
  color: #253334;
  font-family: var(--font-family-sans);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.start-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #253334;
  color: #FFFFFF;
  border: none;
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.start-button:hover {
  background-color: #374a4d;
}

.start-button :deep(svg) {
  width: 16px;
  height: 16px;
}

.duration {
  color: #AAB2B9;
  font-family: var(--font-family-sans);
  font-size: 12px;
}
</style>
