export interface StatisticsApiEntry {
  id: number
  created_at: string
  updated_at: string
  user_id: number
  date: string
  duration_min: number
  feeling_calm: number
  feeling_relax: number
  feeling_focus: number
  feeling_anxiety: number
}

export interface StatisticsApiSummary {
  total_anxiety: number
  total_calm: number
  total_focus: number
  total_minutes: number
  total_relax: number
}

export interface StatisticsApiResponse {
  data: {
    stats: StatisticsApiEntry[]
    summary: StatisticsApiSummary
  }
  status: 'success'
}

export interface DailyStatisticsRecord {
  id: number
  date: string
  durationMinutes: number
  calmCount: number
  relaxCount: number
  focusCount: number
  anxietyCount: number
}

export interface StatisticsSummary {
  totalMinutes: number
  totalCalm: number
  totalRelax: number
  totalFocus: number
  totalAnxiety: number
}

export const EMPTY_STATISTICS_SUMMARY: StatisticsSummary = {
  totalMinutes: 0,
  totalCalm: 0,
  totalRelax: 0,
  totalFocus: 0,
  totalAnxiety: 0
}
