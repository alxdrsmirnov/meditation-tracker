<script setup lang="ts">
import type { Component } from 'vue'
import { useProfileStore } from '../../store/profile.store'
import AnxiousIcon from '../../icons/AnxiousIcon.vue'
import RelaxIcon from '../../icons/RelaxIcon.vue'
import BuddaIcon from '../../icons/BuddaIcon.vue'
import InJanIcon from '../../icons/InJanIcon.vue'

const profileStore = useProfileStore()

const moodIcons: Record<string, Component> = {
  anxious: AnxiousIcon,
  relax: RelaxIcon,
  budda: BuddaIcon,
  injan: InJanIcon
}

function getMoodIcon(iconName: string) {
  return moodIcons[iconName] ?? AnxiousIcon
}

async function handleMoodClick(moodId: typeof profileStore.moodOptions[number]['id']) {
  await profileStore.setMood(moodId)
}
</script>

<template>
  <div class="mood-selector">
    <div
      v-for="mood in profileStore.moodOptions"
      :key="mood.id"
      :class="['mood-option', { selected: profileStore.selectedMood === mood.id }]"
      @click="handleMoodClick(mood.id)"
    >
      <div class="mood-icon">
        <component
          :is="getMoodIcon(mood.icon)"
          :class="['mood-svg', { 'mood-svg--large': mood.icon === 'anxious' }]"
        />
      </div>
      <span class="mood-label">{{ mood.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.mood-selector {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.mood-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F0;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.mood-svg {
  width: 32px;
  height: 32px;
}

.mood-svg--large {
  width: 40px;
  height: 40px;
}

.mood-svg :deep(path:not([data-icon-type="stroke"])),
.mood-svg :deep(circle:not([data-icon-type="stroke"])) {
  fill: #253334 !important;
}

.mood-svg :deep(path[data-icon-type="stroke"]) {
  fill: none !important;
  stroke: #253334 !important;
}

.mood-option:hover .mood-icon {
  background-color: #e8e8e0;
}

.mood-option.selected .mood-icon {
  background-color: #C4A265;
}

.mood-option.selected .mood-svg :deep(path:not([data-icon-type="stroke"])),
.mood-option.selected .mood-svg :deep(circle:not([data-icon-type="stroke"])) {
  fill: #FFFFFF !important;
}

.mood-option.selected .mood-svg :deep(path[data-icon-type="stroke"]) {
  stroke: #FFFFFF !important;
}

.mood-label {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 12px;
  text-align: center;
  font-weight: 500;
}
</style>
