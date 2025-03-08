<script setup lang="ts">
import { ref, inject } from 'vue'
import BlackjackPlayComponent from '@/components/blackjack/BlackjackPlayComponent.vue'
import BlackjackMenuComponent from '@/components/blackjack/BlackjackMenuComponent.vue'
import BlackjackGameResultComponent from '@/components/blackjack/BlackjackGameResultComponent.vue'

const i18n = inject('i18n') as { t: (key: string) => string }

const playGame = ref<boolean>(false)
const totalMoney = ref<number>(1000)
const wager = ref<number>(0)
const win = ref<boolean>(false)
const endGame = ref<boolean>(false)
const message = ref<string>('Congratulations')

interface BetSelectionPayload {
  bet: number
  playState: boolean
}

const newGame = (): void => {
  endGame.value = false
  wager.value = 0
  playGame.value = false
}

const betSelection = ({ bet, playState }: BetSelectionPayload): void => {
  console.log(bet)
  console.log(playState)
  playGame.value = playState
  wager.value = bet
}

const onCheckResult = (playerWin: number, isDoubleBet: boolean): void => {
  if (isDoubleBet) {
    wager.value = wager.value * 2
  }
  if (playerWin === 0) {
    message.value = i18n.t('blackjack.lost')
    totalMoney.value -= wager.value
    win.value = false
  } else if (playerWin === 1) {
    message.value = i18n.t('blackjack.draw')
    win.value = false
  } else {
    message.value = i18n.t('blackjack.win')
    totalMoney.value += wager.value
    win.value = true
  }
  endGame.value = true
}
</script>

<template>
  <main class="max-w-5xl h-full flex flex-col justify-between items-center">
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
