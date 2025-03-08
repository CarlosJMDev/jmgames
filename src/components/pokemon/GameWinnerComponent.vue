<script setup lang="ts">
import { inject } from 'vue'
defineEmits(['new-game'])

const i18n = inject('i18n') as { t: (key: string) => string }
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center bg-slate-600 gap-4">
    <div class="w-52 h-52 border border-black rounded-full bg-radial from-white to-black">
      <header
        class="relative w-full h-[45%] bg-red-500 box-border z-10 [clip-path:ellipse(50%_100%_at_50%_100%)]"
      ></header>
      <main class="bg-black w-full h-[10%] flex justify-center items-center">
        <div
          class="relative w-2/5 h-[400%] bg-black flex justify-center items-center rounded-full z-50"
        >
          <div
            class="bg-white w-6/12 h-1/2 flex justify-center items-center rounded-full border border-black"
          >
            <div
              class="bg-white w-6/12 h-1/2 flex justify-center items-center rounded-full border border-black"
            ></div>
          </div>
        </div>
      </main>
      <footer class="bg-white w-full h-[45%] [clip-path:ellipse(50%_100%_at_50%_0)]"></footer>
    </div>
    <h2 class="text-white">{{ i18n.t('pokemon.win') }}</h2>
    <button class="btn" @click="$emit('new-game')">{{ i18n.t('common.newGame') }}</button>
  </div>
</template>
