<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  remainingAttempts: Number,
  gameOver: Boolean,
  isWinner: Boolean,
})

const statusMessage = computed(() => {
  if (props.isWinner) return '¡Ganaste! 🎉'
  if (props.gameOver) return '¡Perdiste! 😢'
  return ''
})

const statusColor = computed(() => {
  return props.isWinner ? 'text-green-500' : 'text-red-500'
})
</script>

<template>
  <div class="text-center mt-4">
    <p class="text-lg font-bold">Intentos restantes: {{ remainingAttempts }}</p>
    <p v-if="gameOver" class="text-2xl font-bold" :class="statusColor">
      {{ statusMessage }}
    </p>
  </div>
</template>
