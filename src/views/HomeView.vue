<script setup lang="ts">
import GameCard from '../components/GameCard.vue'
</script>

<template>
  <div class="max-w-[min(90%,1000px)] h-full flex justify-center items-center gap-2 flex-col py-12">
    <div class="max-w-5xl h-full flex flex-col md:grid md:grid-cols-2 gap-8">
      <GameCard
        title="Tetris"
        description="Arrange the pieces to form complete lines. Completed lines will be cleared and you will earn points. As you progress, the drop speed will increase, so stay alert!"
        image="Tetris"
        link="tetris"
      />
      <GameCard
        title="Hangman"
        description="Correct letters fill in the blanks, while wrong guesses add parts to a hangman drawing. The game continues until you either complete the word or the drawing is finished.
        Your goal is to guess the word before the drawing is complete.
        Enjoy the challenge!"
        image="Hangman"
        link="hangman"
      />
      <GameCard
        title="Blackjack"
        description="Win the game by obtaining a score higher than the other player and with a value less than or equal to 21"
        image="Blackjack"
        link="blackjack"
      />
      <GameCard
        title="Guest that Pokemon"
        description="Win the game by obtaining a score of 100 points by hitting a total of 50 Pokemons"
        image="Pokemon"
        link="pokemon"
      />
    </div>
  </div>
</template>
