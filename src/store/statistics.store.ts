import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.store'
import {
  EMPTY_STATISTICS_SUMMARY,
  type DailyStatisticsRecord,
  type StatisticsApiEntry,
  type StatisticsApiResponse,
  type StatisticsApiSummary,
  type StatisticsSummary
} from '../types/statistics'

const API_BASE_URL = 'http://localhost:3000'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isStatisticsApiEntry(value: unknown): value is StatisticsApiEntry {
  if (!isRecord(value)) {
    return false
  }

  return (
    isFiniteNumber(value.id) &&
    typeof value.created_at === 'string' &&
    typeof value.updated_at === 'string' &&
    isFiniteNumber(value.user_id) &&
    typeof value.date === 'string' &&
    isFiniteNumber(value.duration_min) &&
    isFiniteNumber(value.feeling_calm) &&
    isFiniteNumber(value.feeling_relax) &&
    isFiniteNumber(value.feeling_focus) &&
    isFiniteNumber(value.feeling_anxiety)
  )
}

function isStatisticsApiSummary(value: unknown): value is StatisticsApiSummary {
  if (!isRecord(value)) {
    return false
  }

  return (
    isFiniteNumber(value.total_anxiety) &&
    isFiniteNumber(value.total_calm) &&
    isFiniteNumber(value.total_focus) &&
    isFiniteNumber(value.total_minutes) &&
    isFiniteNumber(value.total_relax)
  )
}

function isStatisticsApiResponse(value: unknown): value is StatisticsApiResponse {
  if (!isRecord(value) || value.status !== 'success' || !isRecord(value.data)) {
    return false
  }

  return (
    Array.isArray(value.data.stats) &&
    value.data.stats.every(isStatisticsApiEntry) &&
    isStatisticsApiSummary(value.data.summary)
  )
}

function getResponseMessage(value: unknown, fallbackMessage: string): string {
  if (isRecord(value) && typeof value.message === 'string' && value.message.trim()) {
    return value.message
  }

  return fallbackMessage
}

function normalizeDailyStat(entry: StatisticsApiEntry): DailyStatisticsRecord {
  return {
    id: entry.id,
    date: entry.date,
    durationMinutes: entry.duration_min,
    calmCount: entry.feeling_calm,
    relaxCount: entry.feeling_relax,
    focusCount: entry.feeling_focus,
    anxietyCount: entry.feeling_anxiety
  }
}

function normalizeSummary(summary: StatisticsApiSummary): StatisticsSummary {
  return {
    totalMinutes: summary.total_minutes,
    totalCalm: summary.total_calm,
    totalRelax: summary.total_relax,
    totalFocus: summary.total_focus,
    totalAnxiety: summary.total_anxiety
  }
}

async function parseJson(response: Response): Promise<unknown | null> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export const useStatisticsStore = defineStore('statistics', () => {
  const authStore = useAuthStore()

  const summary = ref<StatisticsSummary>({ ...EMPTY_STATISTICS_SUMMARY })
  const dailyStats = ref<DailyStatisticsRecord[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)
  const saveError = ref<string | null>(null)

  async function fetchStats(): Promise<boolean> {
    const token = authStore.getToken()
    if (!token) {
      error.value = 'Требуется авторизация'
      dailyStats.value = []
      summary.value = { ...EMPTY_STATISTICS_SUMMARY }
      return false
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const rawData = await parseJson(response)

      if (!response.ok) {
        error.value = getResponseMessage(rawData, 'Не удалось загрузить статистику')
        return false
      }

      if (!isStatisticsApiResponse(rawData)) {
        error.value = 'Сервер вернул неожиданный формат статистики'
        return false
      }

      dailyStats.value = rawData.data.stats.map(normalizeDailyStat)
      summary.value = normalizeSummary(rawData.data.summary)

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка сети'
      return false
    } finally {
      loading.value = false
    }
  }

  async function saveDuration(minutes: number): Promise<boolean> {
    if (minutes <= 0) {
      saveError.value = 'Длительность медитации должна быть больше нуля'
      return false
    }

    const token = authStore.getToken()
    if (!token) {
      saveError.value = 'Требуется авторизация'
      return false
    }

    saving.value = true
    saveError.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'duration_min',
          value: minutes
        })
      })

      const rawData = await parseJson(response)

      if (!response.ok) {
        saveError.value = getResponseMessage(rawData, 'Не удалось сохранить длительность медитации')
        return false
      }

      return true
    } catch (e) {
      saveError.value = e instanceof Error ? e.message : 'Ошибка сети'
      return false
    } finally {
      saving.value = false
    }
  }

  return {
    summary,
    dailyStats,
    loading,
    saving,
    error,
    saveError,
    fetchStats,
    saveDuration
  }
})
