<script setup lang="ts">
import BlackjackPlayComponent from '../../components/blackjack/BlackjackPlayComponent.vue'
import BlackjackMenuComponent from '../../components/blackjack/BlackjackMenuComponent.vue'
import BlackjackGameResultComponent from '../../components/blackjack/BlackjackGameResultComponent.vue'
import { ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

const playGame = ref(false)
const totalMoney = ref(1000)
const wager = ref(0)
const win = ref(false)
const endGame = ref(false)
const message = ref('Congratulations')

const newGame = () => {
  endGame.value = false
  wager.value = 0
  playGame.value = false
}

const betSelection = ({ bet, playState }) => {
  console.log(bet)
  console.log(playState)
  playGame.value = playState
  wager.value = bet
}

const onCheckResult = (playerWin, isDoubleBet) => {
  if (isDoubleBet) {
    wager.value = wager.value * 2
  }
  if (playerWin === 0) {
    message.value = 'Sorry, you lost'
    totalMoney.value -= wager.value
    win.value = false
  } else if (playerWin === 1) {
    message.value = 'Sorry, no one wins'
    win.value = false
  } else {
    message.value = 'Cogratulations'
    totalMoney.value += wager.value
    win.value = true
  }
  endGame.value = true
}
</script>

<template>
  <PageHeader />
  <main>
    <BlackjackGameResultComponent
      v-if="endGame"
      :message="message"
      :isWinner="win"
      @new-game="newGame"
    />
    <div v-else>
      <BlackjackMenuComponent
        v-if="!playGame"
        :totalMoney="totalMoney"
        @bet-selection="betSelection"
      />
      <BlackjackPlayComponent
        v-else
        :bet="wager"
        :totalMoney="totalMoney"
        @check-result="onCheckResult"
      />
    </div>
  </main>
</template>

<!-- <script setup lang="ts">
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
  <div class="bg-[#184132] absolute w-screen h-fit sm:h-screen pt-32 -z-50">
    <PageHeader />
    <main class="flex flex-col justify-center items-center text-white">
      <h2 class="font-bold text-2xl">Blackjack</h2>
      <p>Please, select your bet to start play</p>
      <div class="flex flex-col sm:flex-row sm:gap-8">
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 white"
          @click="bet(1)"
        >
          5
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 red"
          @click="bet(2)"
        >
          10
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 green"
          @click="bet(3)"
        >
          20
        </button>
        <button
          class="relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0 blue"
          @click="bet(4)"
        >
          50
        </button>
        <button
          class="black relative flex justify-center items-center w-[100px] h-[100px] text-[white] cursor-pointer mx-auto my-[30px] p-0 rounded-[50%] border-[13px] border-dashed border-[white] before:absolute before:z-[-1] before:content-[''] before:-m-4 before:rounded-[50%] before:inset-0 after:absolute after:z-[-1] after:content-[''] after:m-[5px] after:rounded-[50%] after:border-[3px] after:border-dashed after:border-[white] after:inset-0"
          @click="bet(5)"
        >
          100
        </button>
      </div>
      <div class="flex gap-4">
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
</style> -->
