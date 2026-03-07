<script setup lang="ts">
import { computed } from 'vue'
import LotusIcon from '../../icons/LotusIcon.vue'

interface Props {
  showLogo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLogo: true
})
</script>

<template>
  <div class="auth-layout">
    <div class="auth-background"></div>
    <div class="auth-content">
      <div v-if="props.showLogo" class="logo-container">
        <LotusIcon class="logo-icon" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/forest-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.auth-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(37, 51, 52, 0.85);
  z-index: 1;
}

.auth-content {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.logo-container {
  margin-bottom: 32px;
  animation: float 6s ease-in-out infinite;
  flex-shrink: 0;
}

.logo-icon {
  width: 100px;
  height: 100px;
  fill: #FFFFFF;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
