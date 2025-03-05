<script setup lang="ts">
const emit = defineEmits<{
  (e: 'init-game'): void
}>()

defineProps({
  score: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
})

const initGame = () => emit('init-game')
</script>

<template>
  <h1 class="text-center text-white text-6xl font-retro">Game Over</h1>
  <div class="flex flex-col justify-center items-center gap-2">
    <p class="font-bold text-white">
      Your score has been <span class="text-lg">{{ score }} points</span>
    </p>
    <p class="font-bold text-white">
      You have reached the <span class="text-lg">level {{ level }}</span>
    </p>
  </div>
  <button
    class="font-bold text-white cursor-pointer border border-yellow-400 rounded-lg p-2 bg-yellow-600"
    @click="initGame"
  >
    New Game
  </button>
</template>
