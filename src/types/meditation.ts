export interface Meditation {
  id: number
  title: string
  description: string
  duration_min: number
}

export interface MeditationsResponse {
  data: {
    meditations: Meditation[]
  }
  status: string
}

export interface UserProfile {
  name: string
  avatarUrl: string
}

export type MoodType = 'calm' | 'relaxed' | 'focused' | 'anxious'

export interface MoodOption {
  id: MoodType
  label: string
  icon: string
}
