<!-- src/views/tetris/TetrisGameView.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, inject } from 'vue'
import { useTetris } from '@/composables/useTetris'
import Info from '@/components/tetris/InfoComponent.vue'
import Board from '@/components/tetris/BoardComponent.vue'
import Controls from '@/components/tetris/ControlsComponent.vue'
import GameEndComponent from '@/components/tetris/GameEndComponent.vue'

const i18n = inject('i18n') as { t: (key: string) => string }

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
  <h1 class="text-3xl font-extrabold text-white mt-10">{{ i18n.t('tetris.title') }}</h1>
  <GameEndComponent v-if="gameOver" @init-game="handleInit" :score="score" :level="level" />
  <div v-else class="w-full h-full p-2 flex flex-col lg:flex-row items-center justify-center">
    <div class="flex flex-col justify-center items-center mt-2">
      <Board :grid="grid" />
    </div>
    <div class="flex flex-col gap-2 items-center justify-center">
      <Controls @move="handleMove" @rotate="handleRotate" @down="handleDown" />
      <Info :score="score" :level="level" :paused="paused" @pause-game="handlePause" />
      <div class="p-6 bg-gray-800 text-white rounded-md max-w-md mx-auto my-4">
        <h2 class="text-2xl font-bold mb-4">{{ i18n.t('tetris.instructions') }}</h2>
        <ul class="list-disc pl-5">
          <li v-html="i18n.t('tetris.moveLeft')"></li>
          <li v-html="i18n.t('tetris.moveRight')"></li>
          <li v-html="i18n.t('tetris.dropPiece')"></li>
          <li v-html="i18n.t('tetris.rotatePiece')"></li>
          <li v-html="i18n.t('tetris.resumePause')"></li>
        </ul>
        <p class="mt-4" v-html="i18n.t('tetris.objective')"></p>
        <p class="mt-2 font-bold text-center">{{ i18n.t('tetris.goodLuck') }}</p>
      </div>
    </div>
  </div>
</template>
