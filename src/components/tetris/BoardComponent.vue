<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  grid: {
    type: Array as PropType<number[][]>,
    required: true,
  },
})

// Computamos el estilo para definir dinámicamente el número de columnas según la longitud de la primera fila
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.grid[0]?.length || 10}, minmax(0, 1fr))`,
}))
</script>

<template>
  <main class="w-2xl h-3xl p-10 max-w-md">
    <div class="grid gap-0.5 justify-items-center border-2 border-gray-600 p-1" :style="gridStyle">
      <template v-for="(row, rowIndex) in grid" :key="rowIndex">
        <template v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
          <div
            class="w-8 h-8 border border-gray-700"
            :class="cell !== 0 ? 'bg-green-600' : 'bg-gray-800'"
          ></div>
        </template>
      </template>
    </div>
    <!-- </div> -->
  </main>
</template>

<!-- No es necesario agregar estilos adicionales ya que se usa Tailwind CSS -->
<style scoped></style>
