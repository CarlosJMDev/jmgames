<script setup lang="ts">
import { onMounted } from 'vue'
import Board from '@/components/tetris/BoardComponent.vue'
import { useTetris } from '@/composables/useTetris'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

// Se obtiene el estado y las funciones necesarias desde el composable useTetris
const { grid, initGame, score, level, movePiece, rotatePiece, dropPiece } = useTetris()

// Al montar la vista se inicia el juego
onMounted(() => {
  initGame()
})
</script>

<template>
  <PageHeader />
  <div class="w-screen h-screen p-14 flex flex-col items-center">
    <h1 class="text-3xl font-bold text-white mb-4">Tetris Game</h1>
    <Board :grid="grid" />
    <!-- <Controls @move="movePiece" @rotate="rotatePiece" @drop="dropPiece" /> -->
    <!-- <Info :score="score" :level="level" /> -->
  </div>
  <PageFooter />
</template>
