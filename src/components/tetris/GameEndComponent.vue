<script setup lang="ts">
import { inject } from 'vue'
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

const i18n = inject('i18n') as { t: (key: string) => string }
</script>

<template>
  <h1 class="text-center text-white text-6xl font-retro">{{ i18n.t('tetris.gameOver') }}</h1>
  <div class="flex flex-col justify-center items-center gap-2">
    <p class="font-bold text-white">
      {{ i18n.t('tetris.scoreText') }} <span class="text-lg">{{ score }}</span>
    </p>
    <p class="font-bold text-white">
      {{ i18n.t('tetris.levelText') }} <span class="text-lg"> {{ level }}</span>
    </p>
  </div>
  <button
    class="font-bold text-white cursor-pointer border border-yellow-400 rounded-lg p-2 bg-yellow-600"
    @click="initGame"
  >
    {{ i18n.t('common.newGame') }}
  </button>
</template>
