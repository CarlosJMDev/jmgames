<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import GameCard from '../components/GameCard.vue'
</script>

<template>
  <PageHeader />
  <div class="max-w-[min(95%,1200px)] h-full flex justify-center items-center gap-2 flex-col py-12">
    <div class="max-w-5xl h-full flex flex-col md:grid md:grid-cols-2 gap-10">
      <GameCard
        title="Blackjack"
        description="Win the game by obtaining  a score higher than the other player and with a value less than or equal to 21"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="blackjack"
      />
      <GameCard
        title="Guest that Pokemon"
        description="Win the game by obtaining a score of 100 "
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="pokemon"
      />
      <GameCard
        title="Tetris"
        description="Win the game by obtaining a score higher than the other player and with a value less than or equal to 21"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="tetris"
      />
      <GameCard
        title="Blackjack"
        description="Win the game by obtaining a score higher than the other player and with a value less than or equal to 21"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="blackjack"
      />
    </div>
  </div>
  <PageFooter />
</template>
