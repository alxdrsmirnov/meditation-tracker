<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/layout/Header.vue'
import { useMeditationStore } from '../store/meditation.store'
import { useStatisticsStore } from '../store/statistics.store'
import type { Meditation } from '../types/meditation'

interface SessionStatus {
  text: string
  type: 'success' | 'error' | 'info'
}

const route = useRoute()
const router = useRouter()
const meditationStore = useMeditationStore()
const statisticsStore = useStatisticsStore()

const totalSeconds = ref(0)
const remainingSeconds = ref(0)
const isRunning = ref(false)
const isCompleted = ref(false)
const completionSuccess = ref<string | null>(null)
const completionError = ref<string | null>(null)

let timerId: number | null = null

const routeMeditationId = computed(() => {
  const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const parsedId = Number(rawId)

  return Number.isFinite(parsedId) ? parsedId : NaN
})

const meditation = computed(() => {
  return meditationStore.meditations.find((item) => item.id === routeMeditationId.value) ?? null
})

const progressPercent = computed(() => {
  if (totalSeconds.value === 0) {
    return 0
  }

  return ((totalSeconds.value - remainingSeconds.value) / totalSeconds.value) * 100
})

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const primaryActionLabel = computed(() => {
  if (isRunning.value) {
    return 'Пауза'
  }

  if (remainingSeconds.value === totalSeconds.value) {
    return 'Старт'
  }

  return 'Продолжить'
})

const sessionStatus = computed<SessionStatus | null>(() => {
  if (statisticsStore.saving) {
    return {
      text: 'Сохраняем длительность медитации...',
      type: 'info'
    }
  }

  if (completionError.value) {
    return {
      text: completionError.value,
      type: 'error'
    }
  }

  if (completionSuccess.value) {
    return {
      text: completionSuccess.value,
      type: 'success'
    }
  }

  if (isCompleted.value) {
    return {
      text: 'Сессия завершена.',
      type: 'success'
    }
  }

  return null
})

const timerProgressStyle = computed(() => {
  const progressDegrees = progressPercent.value * 3.6

  return {
    background: `conic-gradient(#8be5dc 0deg ${progressDegrees}deg, rgba(255, 255, 255, 0.1) ${progressDegrees}deg 360deg)`
  }
})

function clearTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }

  isRunning.value = false
}

async function completeSession() {
  clearTimer()
  isCompleted.value = true

  if (!meditation.value) {
    return
  }

  completionSuccess.value = null
  completionError.value = null

  const isSaved = await statisticsStore.saveDuration(meditation.value.duration_min)

  if (isSaved) {
    completionSuccess.value = 'Медитация завершена, время сохранено в статистике.'
    return
  }

  completionError.value = statisticsStore.saveError ?? 'Не удалось сохранить длительность медитации.'
}

function startTimer() {
  if (timerId !== null || remainingSeconds.value === 0 || isCompleted.value) {
    return
  }

  isRunning.value = true

  timerId = window.setInterval(() => {
    if (remainingSeconds.value <= 1) {
      remainingSeconds.value = 0
      void completeSession()
      return
    }

    remainingSeconds.value -= 1
  }, 1000)
}

function toggleTimer() {
  if (isCompleted.value) {
    return
  }

  if (isRunning.value) {
    clearTimer()
    return
  }

  startTimer()
}

function resetTimer() {
  clearTimer()

  if (!meditation.value) {
    return
  }

  totalSeconds.value = meditation.value.duration_min * 60
  remainingSeconds.value = totalSeconds.value
  isCompleted.value = false
  completionSuccess.value = null
  completionError.value = null
}

function goToMeditations() {
  router.push('/')
}

function goToStats() {
  router.push('/stats')
}

function initializeTimer(currentMeditation: Meditation) {
  clearTimer()
  totalSeconds.value = currentMeditation.duration_min * 60
  remainingSeconds.value = totalSeconds.value
  isCompleted.value = false
  completionSuccess.value = null
  completionError.value = null
  startTimer()
}

watch(meditation, (currentMeditation) => {
  if (!currentMeditation) {
    clearTimer()
    totalSeconds.value = 0
    remainingSeconds.value = 0
    isCompleted.value = false
    completionSuccess.value = null
    completionError.value = null
    return
  }

  initializeTimer(currentMeditation)
}, { immediate: true })

onMounted(async () => {
  if (!meditationStore.meditations.length) {
    await meditationStore.fetchMeditations()
  }
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <div class="active-meditation-page">
    <Header />

    <main class="content">
      <button class="back-link" type="button" @click="goToMeditations">
        К списку медитаций
      </button>

      <div v-if="meditationStore.loading && !meditation" class="state-message">
        Загружаем медитацию...
      </div>

      <div v-else-if="meditationStore.error && !meditation" class="state-message state-message--error">
        {{ meditationStore.error }}
      </div>

      <div v-else-if="!meditation" class="state-message state-message--error">
        Медитация не найдена.
      </div>

      <section v-else class="session-card">
        <div class="timer-shell" :style="timerProgressStyle">
          <div class="timer-circle">
            <span class="timer-caption">Осталось</span>
            <span class="timer-value">{{ formattedTime }}</span>
          </div>
        </div>

        <div class="session-copy">
          <div class="duration-badge">{{ meditation.duration_min }} мин</div>
          <h1 class="title">{{ meditation.title }}</h1>
          <p class="description">{{ meditation.description }}</p>
        </div>

        <div class="controls">
          <button class="control-button control-button--secondary" type="button" @click="resetTimer">
            Сбросить
          </button>

          <button
            class="control-button control-button--primary"
            type="button"
            @click="toggleTimer"
            :disabled="statisticsStore.saving || isCompleted"
          >
            {{ primaryActionLabel }}
          </button>

          <button class="control-button control-button--secondary" type="button" @click="goToMeditations">
            Назад
          </button>
        </div>

        <p v-if="sessionStatus" :class="['session-status', `session-status--${sessionStatus.type}`]">
          {{ sessionStatus.text }}
        </p>

        <button
          v-if="isCompleted"
          class="stats-button"
          type="button"
          @click="goToStats"
        >
          Открыть статистику
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.active-meditation-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(196, 162, 101, 0.16), transparent 22%),
    var(--bg-color-primary);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px 48px;
}

.back-link {
  align-self: flex-start;
  margin: 0 auto 16px 48px;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--text-color-primary);
}

.state-message {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 18px;
}

.state-message--error {
  color: #ff9c9c;
}

.session-card {
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 24px 24px 32px;
}

.timer-shell {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}

.timer-circle {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background:
    radial-gradient(circle at 35% 30%, rgba(151, 229, 220, 0.9), rgba(109, 191, 182, 0.92) 38%, rgba(63, 141, 133, 0.95) 68%, rgba(43, 100, 95, 0.98) 100%);
  overflow: hidden;
}

.timer-circle::before,
.timer-circle::after {
  content: '';
  position: absolute;
  inset: auto;
  background: rgba(23, 60, 58, 0.35);
  border-radius: 50%;
}

.timer-circle::before {
  width: 220px;
  height: 90px;
  bottom: -12px;
  left: -16px;
}

.timer-circle::after {
  width: 170px;
  height: 82px;
  bottom: 8px;
  right: -18px;
}

.timer-caption,
.timer-value,
.title,
.description,
.duration-badge,
.session-status {
  position: relative;
  z-index: 1;
}

.timer-caption {
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-family-sans);
  font-size: 18px;
}

.timer-value {
  color: #ffffff;
  font-family: var(--font-family-sans);
  font-size: 52px;
  font-weight: 600;
  line-height: 1;
}

.session-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.duration-badge {
  padding: 8px 16px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  font-family: var(--font-family-sans);
  font-size: 16px;
}

.title {
  margin: 0;
  color: var(--text-color-primary);
  font-family: var(--font-family);
  font-size: 46px;
  font-weight: 600;
}

.description {
  max-width: 560px;
  margin: 0;
  color: var(--text-color-secondary);
  font-family: var(--font-family-sans);
  font-size: 24px;
  line-height: 1.35;
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-button,
.stats-button {
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;
}

.control-button:hover,
.stats-button:hover {
  transform: translateY(-1px);
}

.control-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
  transform: none;
}

.control-button {
  min-width: 132px;
  padding: 14px 22px;
  border-radius: 999px;
  font-family: var(--font-family-sans);
  font-size: 18px;
  font-weight: 600;
}

.control-button--primary {
  background-color: #f5f5f0;
  color: #253334;
  min-width: 156px;
}

.control-button--secondary {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--text-color-primary);
}

.session-status {
  min-height: 26px;
  margin: 0;
  font-family: var(--font-family-sans);
  font-size: 18px;
  text-align: center;
}

.session-status--success {
  color: #b9f8c3;
}

.session-status--error {
  color: #ffb7b7;
}

.session-status--info {
  color: #e7e1c3;
}

.stats-button {
  padding: 14px 26px;
  border-radius: 999px;
  background-color: #c4a265;
  color: #1f2b2c;
  font-family: var(--font-family-sans);
  font-size: 18px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .content {
    padding-left: 16px;
    padding-right: 16px;
  }

  .back-link {
    margin-left: 0;
  }

  .timer-shell {
    width: 240px;
    height: 240px;
  }

  .timer-value {
    font-size: 42px;
  }

  .title {
    font-size: 38px;
  }

  .description {
    font-size: 20px;
  }
}
</style>
