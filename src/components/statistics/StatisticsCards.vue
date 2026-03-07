<script setup lang="ts">
import { computed } from 'vue'
import type { StatisticsSummary } from '../../types/statistics'

const props = defineProps<{
  summary: StatisticsSummary
}>()

const cards = computed(() => {
  return [
    {
      id: 'minutes',
      value: props.summary.totalMinutes,
      label: 'Минут медитации',
      theme: 'mint'
    },
    {
      id: 'calm',
      value: props.summary.totalCalm,
      label: 'Спокойных дней',
      theme: 'green'
    },
    {
      id: 'relax',
      value: props.summary.totalRelax,
      label: 'Расслабленных дней',
      theme: 'blue'
    },
    {
      id: 'focus',
      value: props.summary.totalFocus,
      label: 'Фокусированных дней',
      theme: 'olive'
    },
    {
      id: 'anxiety',
      value: props.summary.totalAnxiety,
      label: 'Тревожных дней',
      theme: 'rose'
    }
  ]
})
</script>

<template>
  <div class="statistics-grid">
    <article
      v-for="card in cards"
      :key="card.id"
      :class="['statistics-card', `statistics-card--${card.theme}`]"
    >
      <div class="statistics-card__wave"></div>
      <div class="statistics-card__content">
        <span class="statistics-card__value">{{ card.value }}</span>
        <p class="statistics-card__label">{{ card.label }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.statistics-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
}

.statistics-card {
  --card-bg: #79b7aa;
  --card-accent: rgba(35, 82, 78, 0.78);
  position: relative;
  min-height: 190px;
  border-radius: 24px;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  background-color: var(--card-bg);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.16);
}

.statistics-card__content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.statistics-card__value {
  align-self: flex-end;
  color: #ffffff;
  font-family: var(--font-family-sans);
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}

.statistics-card__label {
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-family: var(--font-family-sans);
  font-size: 26px;
  line-height: 1.1;
  max-width: 180px;
}

.statistics-card__wave,
.statistics-card__wave::before,
.statistics-card__wave::after {
  position: absolute;
  background-color: var(--card-accent);
  border-radius: 50%;
}

.statistics-card__wave {
  left: -12%;
  bottom: -42px;
  width: 68%;
  height: 110px;
}

.statistics-card__wave::before,
.statistics-card__wave::after {
  content: '';
  bottom: 22px;
}

.statistics-card__wave::before {
  left: 42%;
  width: 46%;
  height: 92px;
}

.statistics-card__wave::after {
  left: 78%;
  width: 44%;
  height: 84px;
}

.statistics-card--mint {
  --card-bg: #7ab6a9;
  --card-accent: rgba(45, 102, 97, 0.9);
}

.statistics-card--green {
  --card-bg: #7ac368;
  --card-accent: rgba(39, 99, 48, 0.92);
}

.statistics-card--blue {
  --card-bg: #83bfd1;
  --card-accent: rgba(47, 86, 114, 0.92);
}

.statistics-card--olive {
  --card-bg: #9fb36a;
  --card-accent: rgba(93, 94, 36, 0.92);
}

.statistics-card--rose {
  --card-bg: #bd757c;
  --card-accent: rgba(104, 41, 47, 0.92);
}

@media (max-width: 768px) {
  .statistics-grid {
    grid-template-columns: 1fr;
  }

  .statistics-card__value {
    font-size: 56px;
  }

  .statistics-card__label {
    font-size: 22px;
  }
}
</style>
