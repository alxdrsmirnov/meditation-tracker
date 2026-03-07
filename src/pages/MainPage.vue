<script setup lang="ts">
import { onMounted } from 'vue'
import { useMeditationStore } from '../store/meditation.store'
import { useProfileStore } from '../store/profile.store'
import Header from '../components/layout/Header.vue'
import ProfileSidebar from '../components/profile/ProfileSidebar.vue'
import MeditationsGrid from '../components/meditations/MeditationsGrid.vue'

const meditationStore = useMeditationStore()
const profileStore = useProfileStore()

onMounted(() => {
  meditationStore.fetchMeditations()
  profileStore.fetchProfile()
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
}

.content {
  display: flex;
  gap: 16px;
  padding: 0 20px 20px 20px;
}
</style>
