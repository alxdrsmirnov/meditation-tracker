<script setup lang="ts">
import PlayIcon from '../../icons/PlayIcon.vue'
import type { Meditation } from '../../types/meditation'

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
        <span>Начать</span>
        <PlayIcon />
      </button>

      <span class="duration">{{ meditation.duration_min }} мин</span>
    </div>
  </div>
</template>

<style scoped>
.meditation-card {
  background-color: #F5F5F0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--border-radius-large);
  padding: calc(var(--spacing-unit) * 2);
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 160px;
  transition: box-shadow 0.3s ease;
}

.meditation-card:hover {
  box-shadow: 0 0px 20px 2px rgba(255, 255, 255, 0.24);
}

.title {
  color: #1b2626;
  font-family: var(--font-family);
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 4px;
}

.description {
  color: #253334;
  font-family: var(--font-family-sans);
  font-size: 18px;
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
  padding: 12px 20px;
  background-color: #253334;
  color: #FFFFFF;
  border: none;
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-size: 18px;
  transition: background-color 0.2s ease;
}

.start-button:hover {
  background-color: #374a4d;
}

.start-button :deep(svg) {
  width: 16px;
  height: 16px;
  stroke: #FFFFFF;
}

.duration {
  color: #848484;
  font-family: var(--font-family-sans);
  font-size: 18px;
}
</style>
