<script setup lang="ts">
interface HangmanFigureProps {
  errors: number
}

const props = defineProps<HangmanFigureProps>()
</script>

<template>
  <div class="flex justify-center">
    <svg width="200" height="250">
      <!-- Base -->
      <line x1="10" y1="240" x2="150" y2="240" stroke="white" stroke-width="4" />
      <!-- Structure -->
      <line x1="80" y1="240" x2="80" y2="20" stroke="white" stroke-width="4" />
      <line x1="80" y1="20" x2="150" y2="20" stroke="white" stroke-width="4" />
      <line x1="150" y1="20" x2="150" y2="50" stroke="white" stroke-width="4" />
      <!-- Hangman body -->
      <circle
        v-if="props.errors > 0"
        cx="150"
        cy="70"
        r="20"
        stroke="red"
        fill="none"
        stroke-width="3"
      />
      <line
        v-if="props.errors > 1"
        x1="150"
        y1="90"
        x2="150"
        y2="150"
        stroke="red"
        stroke-width="3"
      />
      <line
        v-if="props.errors > 2"
        x1="150"
        y1="110"
        x2="120"
        y2="140"
        stroke="red"
        stroke-width="3"
      />
      <line
        v-if="props.errors > 3"
        x1="150"
        y1="110"
        x2="180"
        y2="140"
        stroke="red"
        stroke-width="3"
      />
      <line
        v-if="props.errors > 4"
        x1="150"
        y1="150"
        x2="130"
        y2="200"
        stroke="red"
        stroke-width="3"
      />
      <line
        v-if="props.errors > 5"
        x1="150"
        y1="150"
        x2="170"
        y2="200"
        stroke="red"
        stroke-width="3"
      />
    </svg>
  </div>
</template>
