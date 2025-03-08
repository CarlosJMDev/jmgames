<script setup lang="ts">
import { computed, inject } from 'vue'

const i18n = inject('i18n') as { t: (key: string) => string }

const props = defineProps({
  remainingAttempts: Number,
  gameOver: Boolean,
  isWinner: Boolean,
})

const statusMessage = computed(() => {
  if (props.isWinner) return i18n.t('hangman.win')
  if (props.gameOver) return i18n.t('hangman.lost')
  return ''
})

const statusColor = computed(() => {
  return props.isWinner ? 'text-green-500' : 'text-red-500'
})
</script>

<template>
  <div class="text-center mt-4">
    <p class="text-lg font-bold">{{ i18n.t('hangman.attempts') }} {{ remainingAttempts }}</p>
    <p v-if="gameOver" class="text-2xl font-bold" :class="statusColor">
      {{ statusMessage }}
    </p>
  </div>
</template>
