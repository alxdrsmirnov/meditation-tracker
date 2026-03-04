import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile, MoodType } from '../types/meditation'

export const useProfileStore = defineStore('profile', () => {
  const user = ref<UserProfile>({
    name: 'Наталья',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  })

  const selectedMood = ref<MoodType | null>(null)

  const moodOptions: { id: MoodType; label: string; icon: string }[] = [
    { id: 'calm', label: 'Спокойно', icon: 'injan' },
    { id: 'relaxed', label: 'Расслабленно', icon: 'relax' },
    { id: 'focused', label: 'Фокусировано', icon: 'budda' },
    { id: 'anxious', label: 'Тревожно', icon: 'anxious' }
  ]

  function setMood(mood: MoodType) {
    selectedMood.value = mood
  }

  return {
    user,
    selectedMood,
    moodOptions,
    setMood
  }
})