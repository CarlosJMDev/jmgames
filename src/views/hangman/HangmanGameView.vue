<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HangmanFigure from '@/components/hangman/HangmanFigure.vue'
import WordDisplay from '@/components/hangman/WordDisplay.vue'
import GameStatus from '@/components/hangman/GameStatus.vue'
import Keyboard from '@/components/hangman/KeyboardEntry.vue'

const word = ref<string>('')

const getWord = async (): Promise<void> => {
  const resp = await fetch('https://random-word-api.vercel.app/api?words=1&type=uppercase')
  const data = await resp.json()
  word.value = data[0]
}

getWord()

const guessedLetters = ref<string[]>([])
const errors = ref<number>(0)
const maxErrors: number = 6

const remainingAttempts = computed<number>(() => maxErrors - errors.value)
const isWinner = computed<boolean>(
  () =>
    word.value !== '' &&
    word.value.split('').every((l: string) => guessedLetters.value.includes(l)),
)
const gameOver = computed<boolean>(() => remainingAttempts.value <= 0 || isWinner.value)

const handleLetterGuess = (letter: string): void => {
  letter = letter.toUpperCase()
  if (gameOver.value || isWinner.value) return
  if (!guessedLetters.value.includes(letter) && /^[A-ZÑ]$/.test(letter)) {
    guessedLetters.value.push(letter)

    if (!word.value.includes(letter)) {
      errors.value++
    }
  }
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (/^[a-zA-ZñÑ]$/.test(event.key)) {
    handleLetterGuess(event.key)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const newGame = (): void => {
  getWord()
  errors.value = 0
  guessedLetters.value = []
}
</script>

<template>
  <div class="flex flex-col items-center mt-20 text-white gap-8">
    <h1 class="text-4xl font-bold">Hangman Game</h1>
    <HangmanFigure :errors="errors" />
    <WordDisplay :secretWord="word" :guessedLetters="guessedLetters" />
    <div v-if="!isWinner && !gameOver">
      <GameStatus
        :remainingAttempts="remainingAttempts"
        :gameOver="gameOver"
        :isWinner="isWinner"
      />
      <Keyboard :guessedLetters="guessedLetters" @letterSelected="handleLetterGuess" />
    </div>
    <div v-else class="flex flex-col justify-center items-center gap-4 font-bold">
      <h2 v-if="isWinner" class="text-green-500">
        Congratulations, you have guessed the correct word!
      </h2>
      <h2 v-else class="text-red-700">Sorry, you got the wrong word. The correct was {{ word }}</h2>
      <button @click="newGame" class="btn">New Game</button>
    </div>
  </div>
</template>
