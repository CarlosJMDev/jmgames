<script setup lang="ts">
import GameCard from '../components/GameCard.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { inject, computed } from 'vue'

const i18n = inject('i18n') as { t: (key: string) => string; locale: string }

const tetrisImage = computed(() => `Tetris${i18n.locale}`)
const hangmanImage = computed(() => `Hangman${i18n.locale}`)
const blackjackImage = computed(() => `Blackjack${i18n.locale}`)
const pokemonImage = computed(() => `Pokemon${i18n.locale}`)
</script>

<template>
  <div class="max-w-[min(90%,1000px)] h-full flex justify-center items-center gap-2 flex-col py-12">
    <LanguageSelector />
    <div class="max-w-5xl h-full flex flex-col md:grid md:grid-cols-2 gap-8 mt-8">
      <GameCard
        :title="i18n.t('tetris.title')"
        :description="i18n.t('tetris.description')"
        :image="tetrisImage"
        link="tetris"
      />
      <GameCard
        :title="i18n.t('hangman.title')"
        :description="i18n.t('hangman.description')"
        :image="hangmanImage"
        link="hangman"
      />
      <GameCard
        :title="i18n.t('blackjack.title')"
        :description="i18n.t('blackjack.description')"
        :image="blackjackImage"
        link="blackjack"
      />
      <GameCard
        :title="i18n.t('pokemon.title')"
        :description="i18n.t('pokemon.description')"
        :image="pokemonImage"
        link="pokemon"
      />
    </div>
  </div>
</template>
