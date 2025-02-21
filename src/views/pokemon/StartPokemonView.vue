<script setup lang="ts">
import PokemonPicture from '@/components/pokemon/PokemonPictureComponent.vue'
import PokemonOptions from '@/components/pokemon/PokemonOptionsComponent.vue'
import GameWinner from '@/components/pokemon/GameWinnerComponent.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions.js'
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

interface Pokemon {
  id: number
  name: string
}

const pokemonArr = ref<Pokemon[]>([])
const pokemon = ref<Pokemon | null>(null)
const showPokemon = ref<boolean>(false)
const showAnswer = ref<boolean>(false)
const message = ref<string>('')

const progress = ref<number>(0)
const win = ref<boolean>(false)

const disableBtn = ref<boolean>(false)

const isAWinner = (): boolean => win.value

onMounted(() => {
  mixPokemonsArray()
})

const isDisabled = (): string => {
  if (disableBtn.value === true) {
    return 'isDisabled'
  }
  return ''
}

const disable = (): boolean => disableBtn.value

const mixPokemonsArray = async () => {
  pokemonArr.value = await getPokemonOptions()
  const rndInt = Math.floor(Math.random() * 4)
  pokemon.value = pokemonArr.value[rndInt]
}

const checkAnswer = (selectedId: number) => {
  showPokemon.value = true
  showAnswer.value = true
  if (pokemon.value && selectedId === pokemon.value.id) {
    message.value = `Correct, ${pokemon.value.name}`
    progress.value += 2
  } else if (pokemon.value) {
    message.value = `Incorrect, it was ${pokemon.value.name}`
    progress.value = 0
  }
  if (progress.value === 100) {
    disableBtn.value = true
    setTimeout(() => {
      win.value = true
    }, 3000)
  }
}

const nextPokemon = (): void => {
  showAnswer.value = false
  showPokemon.value = false
  pokemonArr.value = []
  pokemon.value = null
  mixPokemonsArray()
}

const newGame = (): void => {
  nextPokemon()
  progress.value = 0
  win.value = false
  disableBtn.value = false
}
</script>

<template>
  <PageHeader />
  <GameWinner v-if="isAWinner()" @new-game="newGame" />
  <div
    v-else
    class="w-screen h-full sm:h-screen flex flex-col justify-center items-center bg-slate-600 -z-10"
  >
    <h2 class="flex justify-center items-center color-white" v-if="!pokemon">
      Espere por favor...
    </h2>
    <div v-else class="flex flex-col justify-center items-center">
      <h2 class="flex justify-center items-center text-white">¿Quién es este pokémon?</h2>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <PokemonOptions
        :pokemonId="pokemon.id"
        :pokemons="pokemonArr"
        @selection="checkAnswer($event)"
      />

      <div class="center-result" v-if="showAnswer">
        <h2 class="animate-bounce color-white">{{ message }}</h2>
        <button
          class="btn"
          @click="nextPokemon"
          :class="isDisabled()"
          :disabled="disable() ? true : false"
        >
          Next Pokemon
        </button>
      </div>
    </div>
    <footer
      class="w-[min(90%,40rem)] h-8 bg-transparent border flex justify-center items-center relative mx-auto my-4 rounded-2xl border-solid border-[navy];"
    >
      <div
        class="h-full border bg-[green] absolute z-[-5] rounded-2xl border-solid border-[green]"
        :style="`width: ${progress}%;`"
      ></div>
      Progress Bar
    </footer>
  </div>
</template>

<style></style>
