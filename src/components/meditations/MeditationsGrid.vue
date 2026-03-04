<script setup lang="ts">
import { computed } from 'vue'
import { useMeditationStore } from '../../store/meditation.store'
import MeditationCard from './MeditationCard.vue'

const meditationStore = useMeditationStore()

const meditations = computed(() => meditationStore.meditations)
const loading = computed(() => meditationStore.loading)
const error = computed(() => meditationStore.error)
</script>

<template>
  <div class="meditations-grid">
    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div
      v-else
      class="grid"
    >
      <MeditationCard
        v-for="meditation in meditations"
        :key="meditation.id"
        :meditation="meditation"
      />
    </div>
  </div>
</template>

<style scoped>
.meditations-grid {
  flex: 1;
  padding: calc(var(--spacing-unit) * 2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap);
}

.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 16px;
}

.error {
  color: #ff6b6b;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
