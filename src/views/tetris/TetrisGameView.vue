<!-- src/views/tetris/TetrisGameView.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import Board from '@/components/tetris/BoardComponent.vue'
import Controls from '@/components/tetris/ControlsComponent.vue'
import { useTetris } from '@/composables/useTetris'
import GameEndComponent from '@/components/tetris/GameEndComponent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import Info from '@/components/tetris/InfoComponent.vue'

const {
  grid,
  paused,
  gameOver,
  score,
  level,
  rotatePiece,
  movePiece,
  moveDown,
  initTetris,
  cleanupTetris,
  togglePause,
} = useTetris()

onMounted(() => {
  initTetris()
})

onBeforeUnmount(() => {
  cleanupTetris()
})

const handleMove = (direction: -1 | 1) => {
  movePiece(direction)
}
const handleRotate = () => {
  rotatePiece()
}
const handleDown = () => {
  moveDown()
}
const handlePause = () => {
  togglePause()
}
const handleInit = () => {
  initTetris()
}
</script>

<template>
  <PageHeader />
  <h1 class="text-3xl font-extrabold text-white mt-10">Tetris Game</h1>
  <GameEndComponent v-if="gameOver" @init-game="handleInit" :score="score" :level="level" />
  <div v-else class="w-full h-full p-2 flex flex-col lg:flex-row items-center justify-center">
    <div class="flex flex-col justify-center items-center mt-2">
      <Board :grid="grid" />
    </div>
    <div class="flex flex-col gap-2 items-center justify-center">
      <Controls @move="handleMove" @rotate="handleRotate" @down="handleDown" />
      <Info :score="score" :level="level" :paused="paused" @pause-game="handlePause" />
      <div class="p-6 bg-gray-800 text-white rounded-md max-w-md mx-auto my-4">
        <h2 class="text-2xl font-bold mb-4">Game Instructions</h2>
        <ul class="list-disc pl-5">
          <li>
            <strong>Move Left:</strong>
            Press the <kbd class="bg-gray-700 px-1 rounded">Left Arrow</kbd> key to move the piece
            to the left.
          </li>
          <li>
            <strong>Move Right:</strong>
            Press the <kbd class="bg-gray-700 px-1 rounded">Right Arrow</kbd> key to move the piece
            to the right.
          </li>
          <li>
            <strong>Drop Piece:</strong>
            Press the <kbd class="bg-gray-700 px-1 rounded">Down Arrow</kbd> key to drop the piece
            faster.
          </li>
          <li>
            <strong>Rotate Piece:</strong>
            Press the <kbd class="bg-gray-700 px-1 rounded">Space</kbd> key to rotate the piece (if
            there's enough space, it will adjust to remain within the board).
          </li>
          <li>
            <strong>Pause/Resume:</strong>
            Press the <kbd class="bg-gray-700 px-1 rounded">P</kbd> key or click the pause button to
            pause or resume the game.
          </li>
        </ul>
        <p class="mt-4">
          <strong>Game Objective:</strong>
          Arrange the pieces to form complete lines. Completed lines will be cleared and you will
          earn points. As you progress, the drop speed will increase, so stay alert!
        </p>
        <p class="mt-2 font-bold text-center">Good luck and enjoy the game!</p>
      </div>
    </div>
  </div>
  <PageFooter />
</template>
