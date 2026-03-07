import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile, MoodType } from '../types/meditation'
import { useAuthStore } from '../store/auth.store'

export const useProfileStore = defineStore('profile', () => {
  const authStore = useAuthStore()
  
  const user = ref<UserProfile>({
    name: 'Гость',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  })
  const loading = ref(false)
  const selectedMood = ref<MoodType | null>(null)

  const moodOptions: { id: MoodType; label: string; icon: string }[] = [
    { id: 'calm', label: 'Спокойно', icon: 'injan' },
    { id: 'relaxed', label: 'Расслабленно', icon: 'relax' },
    { id: 'focused', label: 'Фокусировано', icon: 'budda' },
    { id: 'anxious', label: 'Тревожно', icon: 'anxious' }
  ]

  async function fetchProfile() {
    const token = authStore.getToken()
    if (!token) {
      user.value = {
        name: 'Гость',
        avatarUrl: 'https://i.pravatar.cc/150?img=5'
      }
      return
    }

    loading.value = true
    try {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        user.value = {
          name: data.data.user.username,
          avatarUrl: 'https://i.pravatar.cc/150?img=5'
        }
      }
    } catch (e) {
      console.error('Failed to fetch profile:', e)
    } finally {
      loading.value = false
    }
  }

  function setMood(mood: MoodType) {
    selectedMood.value = mood
  }

  return {
    user,
    loading,
    selectedMood,
    moodOptions,
    fetchProfile,
    setMood
  }
})