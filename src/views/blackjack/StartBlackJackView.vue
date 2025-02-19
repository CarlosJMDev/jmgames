<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const totalMoney = ref(1000)
const wager = ref(0)

const bet = (chip: number) => {
  if (chip === 1 && totalMoney.value >= 5) {
    wager.value += 5
    totalMoney.value -= 5
  } else if (chip === 2 && totalMoney.value >= 10) {
    wager.value += 10
    totalMoney.value -= 10
  } else if (chip === 3 && totalMoney.value >= 20) {
    wager.value += 20
    totalMoney.value -= 20
  } else if (chip === 4 && totalMoney.value >= 50) {
    wager.value += 50
    totalMoney.value -= 50
  } else if (chip === 5 && totalMoney.value >= 100) {
    wager.value += 100
    totalMoney.value -= 100
  } else {
    alert('You do not have enough money')
  }
}
</script>

<template>
  <div class="bg-[#184132] absolute w-screen h-screen pt-32 -z-50">
    <PageHeader />
    <main class="flex flex-col justify-center items-center">
      <h2>Blackjack</h2>
      <p>Please, select your bet to start play</p>
      <div class="chips">
        <button class="dashed-circle white" @click="bet(1)">5</button>
        <button class="dashed-circle red" @click="bet(2)">10</button>
        <button class="dashed-circle green" @click="bet(3)">20</button>
        <button class="dashed-circle blue" @click="bet(4)">50</button>
        <button class="dashed-circle black" @click="bet(5)">100</button>
      </div>
      <div class="bet">
        <p>{{ wager }}</p>
        <img src="/src/assets/blackjack/chips.svg" alt="bet svg" width="40" />
        <p>{{ totalMoney }}</p>
      </div>
      <br />
      <RouterLink :to="{ name: 'blackjackgame', params: { wager: wager } }">
        <button class="btn">Play</button>
      </RouterLink>
    </main>
  </div>
</template>

<style scoped>
.bet {
  display: flex;
  gap: 2rem;
}

.blackjack-menu {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #184132;
  z-index: -1000;
}

.game-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chips {
  display: flex;
  gap: 1rem;
}

.dashed-circle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  width: 100px;
  height: 100px;
  border: 13px dashed white;
  border-radius: 50%;
  font-family: Helvetica;
  color: white;
  background: none;
  /* color: inherit; */
  /* border: none; */
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.dashed-circle:before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -16px;
  border-radius: 50%;
  content: '';
}

.white {
  border: 13px dashed black;
  color: black;
}

.white:before {
  background-color: white;
  border: 1px solid black;
}

.red:before {
  background-color: red;
}

.green:before {
  background-color: green;
}

.blue:before {
  background-color: blue;
}

.black:before {
  background-color: black;
}

.dashed-circle:after {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 5px;
  border: 3px dashed white;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  content: '';
}

.white::after {
  border: 3px dashed black;
  /* border: 1px solid black; */
}
</style>
