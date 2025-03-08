<script setup lang="ts">
import { inject } from 'vue'
const emit = defineEmits<{
  (e: 'move', direction: -1 | 1): void
  (e: 'rotate'): void
  (e: 'down'): void
}>()

const onLeft = () => emit('move', -1)
const onRight = () => emit('move', 1)
const onDown = () => emit('down')
const onRotate = () => emit('rotate')

const i18n = inject('i18n') as { t: (key: string) => string }
</script>

<template>
  <div class="flex justify-center items-center gap-4 my-4">
    <button @click="onLeft" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ i18n.t('tetris.left') }}
    </button>
    <button @click="onRotate" class="bg-green-500 text-white px-4 py-2 rounded">
      {{ i18n.t('tetris.rotate') }}
    </button>
    <button @click="onRight" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ i18n.t('tetris.right') }}
    </button>
    <button @click="onDown" class="bg-red-500 text-white px-4 py-2 rounded">
      {{ i18n.t('tetris.down') }}
    </button>
  </div>
</template>
