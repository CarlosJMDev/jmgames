<script setup lang="ts">
import ConfettiExplosion from 'vue-confetti-explosion'
import { ref, onMounted } from 'vue'

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
  <header class="confetti center">
    <ConfettiExplosion :particleCount="700" :duration="5000" />
  </header>
  <main class="blackjack-result">
    <section class="blackjack-card">
      <div class="blackjack-card-first-square" :style="`background-color: ${background};`">
        <div class="blackjack-card-second-square">
          <div class="blackjack-card-circle">
            <div class="blackjack-card-diamont" :style="`background-color: ${background};`"></div>
          </div>
          <p class="blackjack-card-message">{{ message }}</p>
          <div class="blackjack-card-circle">
            <div class="blackjack-card-diamont" :style="`background-color: ${background};`"></div>
          </div>
        </div>
      </div>
    </section>
    <button class="btn" @click="$emit('new-game')">New Game</button>
  </main>
</template>

<style scoped>
.blackjack-result {
  width: 100vw;
  height: 100vh;
  background-color: #184132;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.blackjack-card {
  width: 15rem;
  height: 22rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blackjack-card-first-square {
  width: 90%;
  height: 92%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.blackjack-card-second-square {
  width: 80%;
  height: 82%;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8%;
}

.blackjack-card-circle {
  width: 80%;
  height: 40%;
  background-color: white;
  border-radius: 50%;
}

.blackjack-card-message {
  margin: 0;
  padding: 0;
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.blackjack-card-diamont {
  height: 100%;
  width: 100%;
  clip-path: polygon(50% 5%, 90% 50%, 50% 95%, 10% 50%);
}
</style>
