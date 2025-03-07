<script setup lang="ts">
import { computed } from 'vue'

interface WordDisplayProps {
  secretWord: string
  guessedLetters?: string[]
}

const props = defineProps<WordDisplayProps>()

// const props = defineProps({
//   secretWord: String,
//   guessedLetters: {
//     type: Array,
//     default: () => [],
//   },
// })

const displayedWord = computed<string>(() =>
  props.secretWord
    .split('')
    .map((letter: string) => (props.guessedLetters?.includes(letter) ? letter : '_'))
    .join(' '),
)
</script>

<template>
  <div v-if="props.secretWord" class="text-2xl font-mono tracking-wide">
    <span v-for="(letter, index) in displayedWord" :key="index">{{ letter }}</span>
  </div>
  <div v-else>Loading word ...</div>
</template>
