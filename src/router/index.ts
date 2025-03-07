import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blackjack',
      name: 'blackjack',
      component: () => import('../views/blackjack/StartBlackJackView.vue'),
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: () => import('../views/pokemon/StartPokemonView.vue'),
    },
    {
      path: '/tetris',
      name: 'tetris',
      component: () => import('../views/tetris/TetrisGameView.vue'),
    },
    {
      path: '/hangman',
      name: 'hangman',
      component: () => import('../views/hangman/HangmanGameView.vue'),
    },
  ],
})

export default router
