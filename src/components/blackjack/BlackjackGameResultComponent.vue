<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isWinner: {
    type: Boolean,
    required: true,
  },
})

const background = ref('black')

defineEmits(['new-game'])

onMounted(() => {
  if (props.isWinner) {
    background.value = 'green'
  } else {
    background.value = 'red'
  }
})
</script>

<template>
  <header class="absolute top-0 left-0 right-0 flex justify-center">
    <ConfettiExplosion :particleCount="500" :duration="5000" />
  </header>
  <main class="w-screen h-full flex flex-col justify-center items-center gap-8 mt-40">
    <section class="w-56 h-80 bg-white rounded-lg flex justify-center items-center">
      <div
        class="w-[90%] h-[92%] flex justify-center items-center"
        :style="`background-color: ${background};`"
      >
        <div
          class="w-4/5 h-[82%] flex flex-col justify-center items-center border border-white gap-[10%]"
        >
          <div class="w-3/5 h-2/5 bg-white rounded-full">
            <div
              class="h-full w-full [clip-path:polygon(50%_5%,90%_50%,50%_95%,10%_50%)]"
              :style="`background-color: ${background};`"
            ></div>
          </div>
          <p class="absolute text-white font-bold text-normal m-0 p-0">{{ message }}</p>
          <div class="w-3/5 h-2/5 bg-white rounded-full">
            <div
              class="w-full h-full [clip-path:polygon(50%_5%,90%_50%,50%_95%,10%_50%)]"
              :style="`background-color: ${background};`"
            ></div>
          </div>
        </div>
      </div>
    </section>
    <button class="btn" @click="$emit('new-game')">New Game</button>
  </main>
</template>
