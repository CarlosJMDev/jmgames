<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  score: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  paused: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits<{
  (e: 'pause-game'): void
}>()

const gamePause = () => emit('pause-game')
</script>

<template>
  <div class="bg-gray-800 p-4 rounded text-white mb-4 flex justify-between w-full max-w-md">
    <div>
      <h2 class="text-2xl font-bold">Score</h2>
      <p class="text-xl">{{ score }}</p>
    </div>
    <button @click="gamePause" class="mb-4 bg-yellow-500 text-white px-4 py-2 rounded">
      {{ paused ? 'Resume' : 'Pause' }}
    </button>
    <div>
      <h2 class="text-2xl font-bold">Level</h2>
      <p class="text-xl">{{ level }}</p>
    </div>
  </div>
</template>

<style scoped></style>
