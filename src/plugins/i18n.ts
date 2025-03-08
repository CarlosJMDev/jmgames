import { type App, reactive } from 'vue'

const messages = {
  en: {
    common: {
      footer: 'Made in Vuejs with 💚',
      welcome: 'Welcome to our game hub',
      selectLanguage: 'Select a language',
      newGame: 'New Game',
      play: 'Play',
    },
    blackjack: {
      title: 'Blackjack',
      description:
        'Win the game by obtaining a score higher than the other player and with a value less than or equal to 21',
      bet: 'Please, select your bet to start to play',
      currentBet: 'Current Bet: ',
      dblBet: 'Double Bet',
      request: 'Request',
      stand: 'Stand',
      player: 'Player',
      dealer: 'Dealer',
      lost: 'Sorry, you lost',
      draw: 'Sorry, no one wins',
      win: 'Congratulations',
    },
    pokemon: {
      title: 'Guess the Pokemon',
      description:
        'Win the game by obtaining a score of 100 points by hitting a total of 50 Pokemons',
      options: 'Select the correct option',
      win: 'Congratulations, you have completed the challenge',
      wait: 'Please wait',
      guess: '¿Who is this Pokemon?',
      next: 'Next Pokemon',
      progress: 'Progress Bar',
      correct: 'Correct, ',
      incorrect: 'Incorrect, it was ',
    },
    tetris: {
      title: 'Tetris',
      description:
        'Arrange the pieces to form complete lines. Completed lines will be cleared and you will earn points. As you progress, the drop speed will increase, so stay alert!',
      resume: 'Resume',
      pause: 'Pause',
      left: 'Left',
      rotate: 'Rotate',
      right: 'Right',
      down: 'Down',
      instructions: 'Game Instructions',
      moveLeft:
        '<strong>Move Left:</strong> Press the <kbd class="bg-gray-700 px-1 rounded">Left Arrow</kbd> key to move the piece to the left.',
      moveRight:
        '<strong>Move Right:</strong> Press the <kbd class="bg-gray-700 px-1 rounded">Right Arrow</kbd> key to move the piece to the right.',
      dropPiece:
        '<strong>Drop Piece:</strong> Press the <kbd class="bg-gray-700 px-1 rounded">Down Arrow</kbd> key to drop the piece faster.',
      rotatePiece:
        '<strong>Rotate Piece:</strong> Press the <kbd class="bg-gray-700 px-1 rounded">Space</kbd> key to rotate the piece (if there is enough space, it will adjust to remain within the board).',
      resumePause:
        '<strong>Pause/Resume:</strong> Press the <kbd class="bg-gray-700 px-1 rounded">P</kbd> key or click the pause button to pause or resume the game.',
      objective:
        '<strong>Game Objective:</strong> Arrange the pieces to form complete lines. Completed lines will be cleared and you will earn points. As you progress, the drop speed will increase, so stay alert!',
      goodLuck: 'Good luck and enjoy the game!',
      gameOver: 'Game Over',
      score: 'Score',
      scoreText: 'Your score has been ',
      level: 'Level',
      levelText: 'You have reached the level ',
    },
    hangman: {
      title: 'Hangman',
      description:
        'Correct letters fill in the blanks, while wrong guesses add parts to a hangman drawing. The game continues until you either complete the word or the drawing is finished. Your goal is to guess the word before the drawing is complete. Enjoy the challenge!',
      attempts: 'Remaining attempts',
      loading: 'Loading word ...',
      congratulations: 'Congratulations, you have guessed the correct word!',
      sorry: 'Sorry, you got the wrong word. The correct was ',
      win: '¡You won! 🎉',
      lost: '¡You lost! 😢',
    },
  },
  es: {
    common: {
      footer: 'Hecho en Vuejs con 💚',
      welcome: 'Bienvenido a nuestro hub de juegos',
      selectLanguage: 'Selecciona un idioma',
      newGame: 'Nuevo Juego',
      play: 'Jugar',
    },
    blackjack: {
      title: 'Blackjack',
      description:
        'Gana el juego obteniendo una puntuación mayor que la del otro jugador y con un valor menor o igual a 21',
      bet: 'Por favor, selecciona tu apuesta para comenzar a jugar',
      currentBet: 'Apuesta Actual: ',
      dblBet: 'Doble Apuesta',
      request: 'Pedir',
      stand: 'Plantarse',
      player: 'Jugador',
      dealer: 'Croupier',
      lost: 'Lo siento, perdiste',
      draw: 'Lo siento, nadie gana',
      win: '¡Felicidades!',
    },
    pokemon: {
      title: 'Adivina el Pokémon',
      description:
        'Gana el juego obteniendo una puntuación de 100 puntos al acertar un total de 50 Pokémon',
      options: 'Selecciona la opción correcta',
      win: '¡Felicidades, has completado el desafío!',
      wait: 'Por favor espera',
      guess: '¿Quién es este Pokémon?',
      next: 'Siguiente Pokémon',
      progress: 'Barra de progreso',
      correct: 'Correcto, ',
      incorrect: 'Incorrecto, era ',
    },
    tetris: {
      title: 'Tetris',
      description:
        'Organiza las piezas para formar líneas completas. Las líneas completadas se borrarán y ganarás puntos. A medida que avanzas, la velocidad de caída aumentará, ¡así que mantente alerta!',
      resume: 'Reanudar',
      pause: 'Pausa',
      left: 'Izquierda',
      rotate: 'Rotar',
      right: 'Derecha',
      down: 'Abajo',
      instructions: 'Instrucciones del juego',
      moveLeft:
        '<strong>Mover a la izquierda:</strong> Presiona la tecla <kbd class="bg-gray-700 px-1 rounded">Flecha Izquierda</kbd> para mover la pieza a la izquierda.',
      moveRight:
        '<strong>Mover a la derecha:</strong> Presiona la tecla <kbd class="bg-gray-700 px-1 rounded">Flecha Derecha</kbd> para mover la pieza a la derecha.',
      dropPiece:
        '<strong>Soltar pieza:</strong> Presiona la tecla <kbd class="bg-gray-700 px-1 rounded">Flecha Abajo</kbd> para soltar la pieza más rápido.',
      rotatePiece:
        '<strong>Rotar pieza:</strong> Presiona la tecla <kbd class="bg-gray-700 px-1 rounded">Espacio</kbd> para rotar la pieza (si hay suficiente espacio, se ajustará para mantenerse dentro del tablero).',
      resumePause:
        '<strong>Pausar/Reanudar:</strong> Presiona la tecla <kbd class="bg-gray-700 px-1 rounded">P</kbd> o haz clic en el botón de pausa para pausar o reanudar el juego.',
      objective:
        '<strong>Objetivo del juego:</strong> Organiza las piezas para formar líneas completas. Las líneas completadas se borrarán y ganarás puntos. A medida que avanzas, la velocidad de caída aumentará, ¡así que mantente alerta!',
      goodLuck: '¡Buena suerte y disfruta el juego!',
      gameOver: 'Fin del juego',
      score: 'Puntos',
      scoreText: 'Tu puntuación es ',
      level: 'Nivel',
      levelText: 'Has alcanzado el nivel ',
    },
    hangman: {
      title: 'Ahorcado',
      description:
        'Las letras correctas llenan los espacios en blanco, mientras que los intentos erróneos añaden partes al dibujo. El juego continúa hasta que completes la palabra o se termine el dibujo. Adivina la palabra antes de completarse el dibujo. ¡Disfruta del desafío!',
      attempts: 'Intentos restantes',
      loading: 'Cargando palabra ...',
      congratulations: '¡Felicidades, has adivinado la palabra correcta!',
      sorry: 'Lo siento, la palabra correcta era ',
      win: '¡Ganaste!',
      lost: '¡Perdiste',
    },
  },
}

const state = reactive({
  locale: localStorage.getItem('lang') || 'es',
})

export default {
  install(app: App) {
    const i18n = {
      t(key: string): string {
        const keys = key.split('.')
        let translation: any = messages[state.locale as keyof typeof messages]
        for (const k of keys) {
          if (translation && translation[k]) {
            translation = translation[k]
          } else {
            return key
          }
        }
        return translation
      },
      get locale() {
        return state.locale
      },
      set locale(newLocale: string) {
        state.locale = newLocale
        localStorage.setItem('lang', newLocale)
      },
    }
    app.provide('i18n', i18n)
    app.config.globalProperties.$i18n = i18n
  },
}
