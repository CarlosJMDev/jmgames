<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useBlackjackStore } from '../../stores/blackjack'
import { RouterLink } from 'vue-router'
const { createDeck, requestCard, cardValue } = useBlackjackStore()

const props = defineProps({
  wager: {
    type: Number,
    required: true,
  },
})

const playerPoints = ref(0)
const computerPoints = ref(0)

const playerCards = ref([])
const computerCards = ref([])

const btnDisabled = reactive({
  newGameBtn: false,
  requestBtn: true,
  standBtn: true,
})

const isNewGameBtnDisabled = () => btnDisabled.newGameBtn
const isRequestBtnDisabled = () => btnDisabled.requestBtn
const isStandBtnDisabled = () => btnDisabled.standBtn

const newGame = () => {
  console.clear()
  createDeck()

  playerPoints.value = 0
  computerPoints.value = 0

  playerCards.value = []
  computerCards.value = []
  btnDisabled.newGameBtn = true
  btnDisabled.requestBtn = false
  btnDisabled.standBtn = false
}

const requestCardBtn = () => {
  const card = requestCard()
  playerPoints.value = playerPoints.value + cardValue(card)
  console.log(card)
  playerCards.value.push(card)
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
  setTimeout(() => {
    if (playerPoints.value > 21) {
      alert('Sorry, you lost')
    } else if (computerPoints.value > 21 || playerPoints.value > computerPoints.value) {
      alert('Yuo win')
    } else if (playerPoints.value === computerPoints.value) {
      alert('Sorry, no one wins')
    } else if (playerPoints.value < computerPoints.value) {
      alert('Sorry, you lost')
    }
  }, 300)
  btnDisabled.requestBtn = true
  btnDisabled.newGameBtn = false
  btnDisabled.standBtn = true
}
</script>

<template>
  <header class="logo">
    <RouterLink :to="{ name: 'home' }" class="link">
      <h1>Games<span>.Vue.js</span></h1>
    </RouterLink>
  </header>
  <main class="blackjack-body">
    <h2 class="blackjack-title">{{ wager }}</h2>
    <h2 class="blackjack-title">{{ props.wager }}</h2>
    <!-- <h2 class="blackjack-title">{{ $route.params.wager }}</h2> -->
    <h2 class="blackjack-title">50</h2>
    <div class="buttons">
      <button
        class="btn new-game-btn"
        :class="isNewGameBtnDisabled() ? 'isDisabled' : ''"
        @click="newGame"
        :disabled="isNewGameBtnDisabled() ? true : false"
      >
        New Game
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
    <h2>
      User - <span>{{ playerPoints }}</span>
    </h2>
    <div class="user-cards">
      <img
        v-for="card of playerCards"
        :key="card"
        :src="'/src/assets/blackjack/' + card + '.png'"
        :alt="'Card ' + card + ' image'"
        width="150"
        class="card"
      />
    </div>
    <h2>
      Computer - <span>{{ computerPoints }}</span>
    </h2>
    <div class="user-cards">
      <img
        v-for="card of computerCards"
        :key="card"
        :src="'/src/assets/blackjack/' + card + '.png'"
        :alt="'Card ' + card + ' image'"
        width="150"
        class="card"
      />
    </div>
  </main>
</template>

<style>
.blackjack-title {
  color: white;
  text-align: center;
}

.blackjack-body {
  width: 100vw;
  background-color: #184132;
  padding: 1rem;
  /* text-align: center; */
}

.user-cards {
  height: 240px;
}

.card {
  position: relative;
  width: 150px;
  left: 100px;
  margin-left: -75px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}
</style>
