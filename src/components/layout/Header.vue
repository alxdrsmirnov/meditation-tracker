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
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: var(--bg-color-primary);
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 40px;
}
</style>
