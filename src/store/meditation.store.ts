import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Meditation, MeditationsResponse } from '../types/meditation'

export const useMeditationStore = defineStore('meditation', () => {
  const meditations = ref<Meditation[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMeditations() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('http://localhost:3000/api/meditations')
      const data: MeditationsResponse = await response.json()
      
      if (data.status === 'success') {
        meditations.value = data.data.meditations
      } else {
        error.value = 'Failed to fetch meditations'
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    meditations,
    loading,
    error,
    fetchMeditations
  }
})
