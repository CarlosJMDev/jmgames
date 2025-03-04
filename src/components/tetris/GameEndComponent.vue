<script setup lang="ts">
import { defineEmits } from 'vue'
const emit = defineEmits<{
  (e: 'init-game'): void
}>()

const initGame = () => emit('init-game')
</script>

<template>
  <button class="font-bold" @click="initGame">New Game</button>
</template>
