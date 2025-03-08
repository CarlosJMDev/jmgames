<script setup lang="ts">
import { inject } from 'vue'
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

const i18n = inject('i18n') as { t: (key: string) => string }
</script>

<template>
  <div class="bg-gray-800 p-4 rounded text-white mb-4 flex justify-between w-full max-w-md">
    <div>
      <h2 class="text-2xl font-bold">{{ i18n.t('tetris.score') }}</h2>
      <p class="text-xl">{{ score }}</p>
    </div>
    <button @click="gamePause" class="btn">
      {{ paused ? i18n.t('tetris.resume') : i18n.t('tetris.pause') }}
    </button>
    <div>
      <h2 class="text-2xl font-bold">{{ i18n.t('tetris.level') }}</h2>
      <p class="text-xl">{{ level }}</p>
    </div>
  </div>
</template>
