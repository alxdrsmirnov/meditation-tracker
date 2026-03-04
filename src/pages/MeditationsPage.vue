<script setup lang="ts">
import { onMounted } from 'vue'
import { useMeditationStore } from '../store/meditation.store'
import Header from '../components/layout/Header.vue'
import ProfileSidebar from '../components/profile/ProfileSidebar.vue'
import MeditationsGrid from '../components/meditations/MeditationsGrid.vue'

const meditationStore = useMeditationStore()

onMounted(() => {
  meditationStore.fetchMeditations()
})
</script>

<template>
  <div class="meditations-page">
    <Header />
    
    <main class="content">
      <ProfileSidebar />
      <MeditationsGrid />
    </main>
  </div>
</template>

<style scoped>
.meditations-page {
  min-height: 100vh;
  background-color: var(--bg-color-primary);
  padding: 0 20px;
}

.content {
  display: flex;
  gap: var(--gap);
}
</style>