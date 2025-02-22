<script setup lang="ts">
import { ref } from 'vue'
// import PageHeader from '@/components/PageHeader.vue'

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
  <div class="bg-[#184132] absolute w-screen h-fit sm:h-screen pt-32 -z-50">
    <main class="flex flex-col justify-center items-center text-white">
      <h2 class="font-bold text-2xl">Blackjack</h2>
      <p>Please, select your bet to start play</p>
      <div class="flex flex-col sm:flex-row sm:gap-8">
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 white"
          @click="betChips(1)"
        >
          5
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 red"
          @click="betChips(2)"
        >
          10
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 green"
          @click="betChips(3)"
        >
          20
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 blue"
          @click="betChips(4)"
        >
          50
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 black"
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

<style scoped>
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

.white::after {
  border: 3px dashed black;
  /* border: 1px solid black; */
}
</style>
