<script setup lang="ts">
import { ref } from 'vue'

interface Pokemon {
  id: number
  name: string
}

const props = defineProps<{
  pokemons: Pokemon[]
  pokemonId: number | null
}>()

const isSelected = ref<boolean>(false)

const select = (): void => {
  isSelected.value = true
}

const disable = (): string => {
  if (isSelected.value) {
    return 'isDisabled'
  }
  return ''
}

const selection = () => isSelected.value
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-8">
    <h2 class="flex justify-center items-center text-white">Select the correct option</h2>
    <ul
      class="flex flex-col sm:flex-row justify-center justify-items-center items-center gap-2 m-0 p-0"
    >
      <button
        class="btn"
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        @click="($emit('selection', pokemon.id), select())"
        :class="disable()"
        :disabled="selection() ? true : false"
      >
        {{ pokemon.name }}
      </button>
    </ul>
  </div>
</template>
