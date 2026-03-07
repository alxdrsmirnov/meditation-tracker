<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Header from '../components/layout/Header.vue'
import StatisticsCards from '../components/statistics/StatisticsCards.vue'
import { useStatisticsStore } from '../store/statistics.store'

const statisticsStore = useStatisticsStore()

const summary = computed(() => statisticsStore.summary)

onMounted(() => {
  void statisticsStore.fetchStats()
})
</script>

<template>
  <div class="statistics-page">
    <Header />

    <main class="statistics-content">
      <section class="hero">
        <h1 class="title">Статистика</h1>
        <p class="subtitle">
          Отслеживайте общее время медитаций и то, как меняется ваше состояние день за днем.
        </p>
      </section>

      <div v-if="statisticsStore.loading" class="status-message">
        Загружаем статистику...
      </div>

      <div v-else-if="statisticsStore.error" class="status-message status-message--error">
        {{ statisticsStore.error }}
      </div>

      <StatisticsCards v-else :summary="summary" />
    </main>
  </div>
</template>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(196, 162, 101, 0.14), transparent 22%),
    var(--bg-color-primary);
}

.statistics-content {
  padding: 8px 40px 48px;
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  margin: 0;
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 52px;
  font-weight: 600;
}

.subtitle {
  max-width: 720px;
  margin: 0;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 24px;
  line-height: 1.35;
}

.status-message {
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 18px;
}

.status-message--error {
  color: #ffb7b7;
}

@media (max-width: 768px) {
  .statistics-content {
    padding-left: 16px;
    padding-right: 16px;
  }

  .title {
    font-size: 42px;
  }

  .subtitle {
    font-size: 20px;
  }
}
</style>
