<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useBlackjackStore } from '../../stores/blackjack'
const { createDeck, requestCard, cardValue } = useBlackjackStore()

const props = defineProps({
  totalMoney: {
    type: Number,
    required: true,
  },
  bet: {
    type: Number,
    required: true,
  },
})

const isDoubleBet = ref<boolean>(false)
const currentBet = ref<number>(props.bet)

const playerPoints = ref<number>(0)
const computerPoints = ref<number>(0)

const playerCards = ref<string[]>([])
const computerCards = ref<string[]>([])
const playerWin = ref<number>(0)

const btnDisabled = reactive({
  doubleBetBtn: false,
  newGameBtn: true,
  requestBtn: false,
  standBtn: false,
})

const emit = defineEmits(['check-result'])

onMounted(() => {
  console.clear()
  if (props.totalMoney < props.bet) {
    btnDisabled.doubleBetBtn = true
  }
  createDeck()
  requestCardBtn()
})

const isDoubleBetBtnDisabled = () => btnDisabled.doubleBetBtn
const isRequestBtnDisabled = () => btnDisabled.requestBtn
const isStandBtnDisabled = () => btnDisabled.standBtn

const requestCardBtn = () => {
  const card = requestCard()
  playerPoints.value = playerPoints.value + cardValue(card)
  playerCards.value.push(card)
  setTimeout(() => {
    if (
      computerPoints.value < 21 &&
      computerPoints.value < playerPoints.value &&
      playerPoints.value < 21
    ) {
      const compCard = requestCard()
      computerPoints.value = computerPoints.value + cardValue(compCard)
      computerCards.value.push(compCard)
    }
    if (playerPoints.value > 21 || computerPoints.value > 21) finishGame()
  }, 500)
}

const standGame = () => {
  while (
    computerPoints.value < 21 &&
    computerPoints.value < playerPoints.value &&
    playerPoints.value <= 21
  ) {
    const compCard = requestCard()
    computerPoints.value = computerPoints.value + cardValue(compCard)
    computerCards.value.push(compCard)
  }
  finishGame()
}

const finishGame = () => {
  if (playerPoints.value > 21) {
    playerWin.value = 0
  } else if (computerPoints.value > 21 || playerPoints.value > computerPoints.value) {
    playerWin.value = 2
  } else if (playerPoints.value === computerPoints.value) {
    playerWin.value = 1
  } else if (playerPoints.value < computerPoints.value) {
    playerWin.value = 0
  }

  emit('check-result', playerWin.value, isDoubleBet.value)
}

const onDoubleBet = () => {
  if (props.totalMoney >= props.bet) {
    isDoubleBet.value = true
    btnDisabled.doubleBetBtn = true
    currentBet.value = props.bet * 2
  }
}
</script>

<template>
  <main class="w-screen h-screen bg-green-900 p-12">
    <h2 class="text-white text-center">Current Bet: {{ currentBet }}$</h2>
    <div class="flex justify-center gap-8 p-4">
      <button
        class="btn double-bet-btn"
        :class="isDoubleBetBtnDisabled() ? 'isDisabled' : ''"
        @click="onDoubleBet"
        :disabled="isDoubleBetBtnDisabled() ? true : false"
      >
        Double Bet
      </button>

      <button
        class="btn request-btn"
        :class="isRequestBtnDisabled() ? 'isDisabled' : ''"
        @click="requestCardBtn"
        :disabled="isRequestBtnDisabled() ? true : false"
      >
        Request
      </button>

      <button
        class="btn stand-btn"
        :class="isStandBtnDisabled() ? 'isDisabled' : ''"
        @click="standGame"
        :disabled="isStandBtnDisabled() ? true : false"
      >
        Stand
      </button>
    </div>
    <h2 class="font-bold py-4 text-white">
      Player - <span>{{ playerPoints }}</span>
    </h2>
    <div class="h-64 flex">
      <picture
        v-for="card of playerCards"
        :key="card"
        class="fade-enter relative w-40 left-32 -ml-32"
      >
        <!-- <source :srcset="'/src/assets/blackjack/' + card + '.avif'" type="image/avif" /> -->
        <source :srcset="'/blackjack/' + card + '.webp'" type="image/webp" />
        <img
          :src="'/blackjack/' + card + '.png'"
          :alt="'Card ' + card + ' image'"
          width="150"
          loading="lazy"
        />
      </picture>
    </div>
    <h2 class="font-bold py-4 text-white">
      Dealer - <span>{{ computerPoints }}</span>
    </h2>
    <div class="h-64 flex">
      <picture
        v-for="card of computerCards"
        :key="card"
        class="fade-enter relative w-40 left-32 -ml-32"
      >
        <!-- <source :srcset="'/src/assets/blackjack/' + card + '.avif'" type="image/avif" /> -->
        <source :srcset="'/blackjack/' + card + '.webp'" type="image/webp" />
        <img
          :src="'/blackjack/' + card + '.png'"
          :alt="'Card ' + card + ' image'"
          width="150"
          loading="lazy"
        />
      </picture>
    </div>
  </main>
</template>

<style>
.fade-enter {
  animation: fadeEnter 0.3s;
}
@keyframes fadeEnter {
  0% {
    transform: translateY(900px);
    z-index: 20;
  }
  100% {
    transform: translateY(0);
    z-index: 1;
  }
}
</style>
