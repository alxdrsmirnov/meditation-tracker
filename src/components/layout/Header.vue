<script setup lang="ts">
import LotusIcon from '../../icons/LotusIcon.vue'
import Navigation from './Navigation.vue'
</script>

<template>
  <header class="header">
    <LotusIcon class="logo" :width="100" />

    <Navigation />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background-color: var(--bg-color-primary);
}

.logo {
  width: 80px;
  height: 80px;
}

</style>
