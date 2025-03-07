<script setup lang="ts">
import { ref } from 'vue'

const alphabet = ref<string[]>('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''))

interface KeyboardProps {
  guessedLetters: string[]
}

// const props = defineProps({
//   guessedLetters: Array,
// })

const props = defineProps<KeyboardProps>()

const emit = defineEmits(['letter-selected'])

const selectLetter = (letter: string) => emit('letter-selected', letter.toUpperCase())
</script>

<template>
  <div class="grid grid-cols-9 gap-2 p-4">
    <button
      v-for="letter in alphabet"
      :key="letter"
      @click="selectLetter(letter)"
      :disabled="props.guessedLetters.includes(letter)"
      class="px-4 py-2 border rounded bg-blue-600 text-white disabled:opacity-50"
    >
      {{ letter }}
    </button>
  </div>
</template>
