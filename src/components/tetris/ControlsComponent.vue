<!-- src/components/tetris/Controls.vue -->
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'move', direction: -1 | 1): void
  (e: 'rotate'): void
  (e: 'down'): void
}>()

const onLeft = () => emit('move', -1)
const onRight = () => emit('move', 1)
const onDown = () => emit('down')
const onRotate = () => emit('rotate')
</script>

<template>
  <div class="flex justify-center items-center gap-4 my-4">
    <button @click="onLeft" class="bg-blue-500 text-white px-4 py-2 rounded">Left</button>
    <button @click="onRotate" class="bg-green-500 text-white px-4 py-2 rounded">Rotate</button>
    <button @click="onRight" class="bg-blue-500 text-white px-4 py-2 rounded">Right</button>
    <button @click="onDown" class="bg-red-500 text-white px-4 py-2 rounded">Down</button>
  </div>
</template>
