<script setup lang="ts">
import { computed } from 'vue'
import { useProfileStore } from '../../store/profile.store'
import AnxiousIcon from '../../icons/AnxiousIcon.vue'
import RelaxIcon from '../../icons/RelaxIcon.vue'
import BuddaIcon from '../../icons/BuddaIcon.vue'
import InJanIcon from '../../icons/InJanIcon.vue'

const profileStore = useProfileStore()

const moodIcons: Record<string, any> = {
  calm: AnxiousIcon,
  relaxed: RelaxIcon,
  focused: BuddaIcon,
  anxious: InJanIcon
}

function getMoodIcon(iconName: string) {
  return moodIcons[iconName] || AnxiousIcon
}
</script>

<template>
  <div class="mood-selector">
    <div
      v-for="mood in profileStore.moodOptions"
      :key="mood.id"
      class="mood-option"
    >
      <component
        :is="getMoodIcon(mood.icon)"
        class="mood-icon"
      />
      <span class="mood-label">{{ mood.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.mood-selector {
  display: flex;
  gap: var(--spacing-unit);
  margin-top: var(--spacing-unit);
}

.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.mood-icon {
  width: 48px;
  height: 48px;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-medium);
  transition: background-color 0.2s ease;
}

.mood-option:hover .mood-icon {
  background-color: rgba(255, 255, 255, 0.2);
}

.mood-label {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 12px;
  text-align: center;
}
</style>
