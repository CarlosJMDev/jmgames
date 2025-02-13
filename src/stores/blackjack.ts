import _ from 'underscore'
import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useBlackjackStore = defineStore('blackjack', () => {
  const cardType: Ref<string[]> = ref(['C', 'D', 'H', 'S'])
  const specialCards: Ref<string[]> = ref(['A', 'J', 'Q', 'K'])
  const deck: Ref<string[]> = ref([])

  const createDeck = (): string[] => {
    deck.value = []

    for (let i = 2; i <= 10; i++) {
      for (const type of cardType.value) {
        deck.value.push(i + type)
      }
    }

    for (const type of cardType.value) {
      for (const esp of specialCards.value) {
        deck.value.push(esp + type)
      }
    }
    deck.value = _.shuffle(deck.value)
    return deck.value
  }

  const requestCard = (): string => {
    if (!deck.value || deck.value.length === 0) {
      throw 'No hay cartas en el deck'
    }
    const card = deck.value.pop()
    if (!card) {
      throw new Error('Error al extraer una carta del deck')
    }
    return card
  }

  const cardValue = (card: string): number => {
    if (!card) throw new Error('No se ha enviado ninguna card')

    const value = card.substring(0, card.length - 1)
    return isNaN(Number(value)) ? (value === 'A' ? 11 : 10) : Number(value) * 1
  }

  return {
    createDeck,
    requestCard,
    cardValue,
  }
})
