<script setup lang="ts">
import LotusIcon from '../../icons/LotusIcon.vue'
import Navigation from './Navigation.vue'
</script>

<template>
  <header class="header">
    <LotusIcon class="logo" />
    <Navigation />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: var(--bg-color-primary);
}

.logo {
  width: 48px;
  height: 48px;
}
</style>
