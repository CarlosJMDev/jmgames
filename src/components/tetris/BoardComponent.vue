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
  <!-- Contenedor principal con fondo y padding al estilo de Tailwind -->
  <main class="w-screen h-screen p-10 max-w-md">
    <!-- <div class="mx-auto max-w-md"> -->
    <!-- Tablero con display grid y un gap entre celdas -->
    <div class="grid gap-0.5 justify-items-center border-2 border-gray-600 p-1" :style="gridStyle">
      <!-- Iteramos sobre cada fila del grid -->
      <template v-for="(row, rowIndex) in grid" :key="rowIndex">
        <!-- Iteramos sobre cada celda de la fila -->
        <template v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
          <!-- Cada celda tiene un tamaño fijo y cambia de color según su contenido -->
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
