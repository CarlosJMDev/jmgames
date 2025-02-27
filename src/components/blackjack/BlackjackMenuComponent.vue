<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  totalMoney: {
    type: Number,
    required: true,
  },
})

const bet = ref(0)
const moneyCredit = ref(props.totalMoney)

const emit = defineEmits(['bet-selection'])

const betChips = (chip: number) => {
  if (chip === 1 && props.totalMoney >= 5) {
    bet.value += 5
    moneyCredit.value -= 5
  } else if (chip === 2 && props.totalMoney >= 10) {
    bet.value += 10
    moneyCredit.value -= 10
  } else if (chip === 3 && props.totalMoney >= 20) {
    bet.value += 20
    moneyCredit.value -= 20
  } else if (chip === 4 && props.totalMoney >= 50) {
    bet.value += 50
    moneyCredit.value -= 50
  } else if (chip === 5 && props.totalMoney >= 100) {
    bet.value += 100
    moneyCredit.value -= 100
  } else {
    alert('You do not have enough money')
  }
}

const emitBet = () => {
  if (bet.value === 0) {
    alert('Place your bet please')
  } else {
    emit('bet-selection', { bet: bet.value, playState: true })
  }
}
</script>

<template>
  <div class="w-full h-full pt-32">
    <main class="flex flex-col justify-center items-center text-white pb-8 mb-8">
      <h2 class="font-bold text-2xl">Blackjack</h2>
      <p>Please, select your bet to start play</p>
      <div class="flex flex-col sm:flex-row sm:gap-8">
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] mx-auto my-[30px] p-0 rounded-full border-[13px] border-dashed border-black text-black bg-transparent z-10 before:absolute before:-z-10 before:inset-0 before:-m-4 before:rounded-full before:bg-white before:content-[''] after:absolute after:z-20 after:inset-0 after:m-[5px] after:rounded-full after:border-[3px] after:border-dashed after:border-black after:content-['']"
          @click="betChips(1)"
        >
          5
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] mx-auto my-[30px] p-0 rounded-full border-[13px] border-dashed border-white text-white bg-transparent z-10 before:absolute before:-z-10 before:inset-0 before:-m-4 before:rounded-full before:bg-red-700 before:content-[''] after:absolute after:z-20 after:inset-0 after:m-[5px] after:rounded-full after:border-[3px] after:border-dashed after:border-white after:content-['']"
          @click="betChips(2)"
        >
          10
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] mx-auto my-[30px] p-0 rounded-full border-[13px] border-dashed border-white text-white bg-transparent z-10 before:absolute before:-z-10 before:inset-0 before:-m-4 before:rounded-full before:bg-green-800 before:content-[''] after:absolute after:z-20 after:inset-0 after:m-[5px] after:rounded-full after:border-[3px] after:border-dashed after:border-white after:content-['']"
          @click="betChips(3)"
        >
          20
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] mx-auto my-[30px] p-0 rounded-full border-[13px] border-dashed border-white text-white bg-transparent z-20 before:absolute before:-z-10 before:inset-0 before:-m-4 before:rounded-full before:bg-blue-800 before:content-[''] after:absolute after:z-20 after:inset-0 after:m-[5px] after:rounded-full after:border-[3px] after:border-dashed after:border-white after:content-['']"
          @click="betChips(4)"
        >
          50
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] mx-auto my-[30px] p-0 rounded-full border-[13px] border-dashed border-white text-white bg-transparent z-10 before:absolute before:-z-10 before:inset-0 before:-m-4 before:rounded-full before:bg-black before:content-[''] after:absolute after:z-20 after:inset-0 after:m-[5px] after:rounded-full after:border-[3px] after:border-dashed after:border-white after:content-['']"
          @click="betChips(5)"
        >
          100
        </button>
      </div>
      <div class="flex gap-4">
        <p>{{ bet }}</p>
        <img src="/src/assets/blackjack/chips.svg" alt="bet svg" width="40" />
        <p>{{ moneyCredit }}</p>
      </div>
      <br />
      <button class="btn" @click="emitBet">Play</button>
    </main>
  </div>
</template>
