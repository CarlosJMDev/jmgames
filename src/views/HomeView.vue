<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import GameCard from '../components/GameCard.vue'
</script>

<template>
  <div class="w-screen h-dvh bg-gray-500 flex justify-center items-center gap-2 flex-col pt-12">
    <PageHeader />
    <div class="flex md:grid md:grid-cols-2 gap-6">
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
        title="Blackjack"
        description="Win the game by obtaining a score higher than the other player and with a value less than or equal to 21"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="blackjack"
      />
      <GameCard
        title="Blackjack"
        description="Win the game by obtaining a score higher than the other player and with a value less than or equal to 21"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        link="blackjack"
      />
    </div>
  </div>
  <!--

  <main class="games-display">
    <RouterLink :to="{ name: 'home' }">
      <div class="game-container pokemon-game">
        <img src="" alt="Pokemons Game Image" />
        <h2>Pokemon Game</h2>
        <p>Guess who's the pokemon</p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'blackjack' }">
      <div class="game-container blackjack-game">
        <img src="" alt="Blackjack Game Image" />
        <h2>Blackjack Game</h2>
        <p>
          Win the game by obtaining a score higher than the other player and with a value less than
          or equal to 21.
        </p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'home' }">
      <div class="game-container tetris-game">
        <img src="" alt="Tetris Game Image" />
        <h2>Tetris Game</h2>
        <p>
          The objective is to make pieces fall and fill in gaps to make lines. Once created, they
          disappear, and we are interested in doing it four at a time instead of one at a time
          because of the points involved in it.
        </p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'home' }">
      <div class="Snake-game game-container">
        <img src="" alt="Snake Game Image" />
        <h2>Snake Game</h2>
        <p>
          Control a snake, which wanders around a defined plane, collecting food, trying to avoid
          hitting its own tail or the edges of the playing area. Every time the snake eats a piece
          of food, its tail lengthens.
        </p>
      </div>
    </RouterLink>
  </main> -->
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
