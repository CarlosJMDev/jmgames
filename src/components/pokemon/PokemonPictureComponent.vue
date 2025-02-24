<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true,
  },
  showPokemon: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const animate = (): boolean => props.showPokemon

const imgSrc = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
)
</script>

<template>
  <div class="h-32 sm:h-40">
    <img
      v-if="!showPokemon"
      :src="imgSrc"
      class="h-full select-none brightness-0 aspect-square"
      alt="pokemon"
    />
    <img
      v-else
      :src="imgSrc"
      class="h-full select-none aspect-square"
      :class="animate() ? 'fade-in' : ''"
      alt="pokemon"
    />
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn linear 1.2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
