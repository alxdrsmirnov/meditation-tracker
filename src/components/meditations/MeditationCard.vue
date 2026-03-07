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
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 280px;
  min-height: 140px;
  transition: box-shadow 0.3s ease;
}

.meditation-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.title {
  color: #1b2626;
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.description {
  color: #253334;
  font-family: var(--font-family-sans);
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.start-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: #253334;
  color: #FFFFFF;
  border: none;
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.start-button:hover {
  background-color: #374a4d;
}

.start-button :deep(svg) {
  width: 14px;
  height: 14px;
  stroke: #FFFFFF;
}

.duration {
  color: #848484;
  font-family: var(--font-family-sans);
  font-size: 14px;
  font-weight: 500;
}
</style>
