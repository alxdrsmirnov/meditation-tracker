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
      <div class="mood-icon">
        <component
          :is="getMoodIcon(mood.icon)"
          class="mood-svg"
        />
      </div>
      <span class="mood-label">{{ mood.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.mood-selector {
  display: flex;
  gap: 20px;
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
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #253334;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.mood-svg {
  width: 44px;
  height: 44px;
}

.mood-svg :deep(path) {
  fill: #FFFFFF !important;
}

.mood-option:hover .mood-icon {
  background-color: #2d3d40;
}

.mood-label {
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 13px;
  text-align: center;
}
</style>
