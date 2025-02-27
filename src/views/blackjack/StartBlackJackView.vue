<script setup lang="ts">
import BlackjackPlayComponent from '../../components/blackjack/BlackjackPlayComponent.vue'
import BlackjackMenuComponent from '../../components/blackjack/BlackjackMenuComponent.vue'
import BlackjackGameResultComponent from '../../components/blackjack/BlackjackGameResultComponent.vue'
import { ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

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
  <main class="max-w-5xl min-h-screen flex flex-col justify-between items-center">
    <PageHeader />
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
    <PageFooter />
  </main>
</template>
