import { ref, computed } from 'vue'

const rows = 20
const columns = 10
const grid = ref<number[][]>(Array.from({ length: rows }, () => Array(columns).fill(0)))

const pieces: number[][][] = [
  [[1, 1, 1, 1]], // I
  [
    [2, 2],
    [2, 2],
  ],
  [
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    [0, 4, 4],
    [4, 4, 0],
  ],
  [
    [5, 5, 0],
    [0, 5, 5],
  ],
  [
    [6, 0, 0],
    [6, 6, 6],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
  ],
]

const paused = ref(false)
const gameOver = ref(false)
const score = ref(0)
const level = ref(1)

const getRandomPiece = (): number[][] => {
  const index = Math.floor(Math.random() * pieces.length)
  return pieces[index]
}

const currentPiece = ref({
  shape: getRandomPiece(),
  x: Math.floor(columns / 2) - Math.floor(getRandomPiece()[0].length / 2),
  y: 0,
})

const hasCollision = (x: number, y: number, shape: number[][]): boolean => {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] !== 0) {
        const newX = x + j
        const newY = y + i
        if (newX < 0 || newX >= columns) return true
        if (newY >= rows) return true
        if (newY >= 0 && grid.value[newY][newX] !== 0) return true
      }
    }
  }
  return false
}

const rotateMatrix = (matrix: number[][]): number[][] => {
  return matrix[0].map((_, i) => matrix.map((row) => row[i])).reverse()
}

const rotatePiece = () => {
  if (paused.value || gameOver.value) return
  const newShape = rotateMatrix(currentPiece.value.shape)
  let newX = currentPiece.value.x
  while (hasCollision(newX, currentPiece.value.y, newShape)) {
    if (newX > Math.floor(columns / 2)) {
      newX--
    } else {
      newX++
    }
    if (newX < 0 || newX >= columns) {
      return // Cancela la rotación si no se puede ajustar
    }
  }
  if (!hasCollision(newX, currentPiece.value.y, newShape)) {
    currentPiece.value.shape = newShape
    currentPiece.value.x = newX
  }
}

const movePiece = (direction: number) => {
  if (paused.value || gameOver.value) return
  const newX = currentPiece.value.x + direction
  if (!hasCollision(newX, currentPiece.value.y, currentPiece.value.shape)) {
    currentPiece.value.x = newX
  }
}

const placePiece = () => {
  const { shape, x, y } = currentPiece.value
  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== 0 && y + i >= 0 && y + i < rows && x + j >= 0 && x + j < columns) {
        grid.value[y + i][x + j] = cell
      }
    })
  })
}

const clearLines = () => {
  let linesCleared = 0
  grid.value = grid.value.filter((row) => {
    const full = row.every((cell) => cell !== 0)
    if (full) linesCleared++
    return !full
  })
  // Agregar filas vacías en la parte superior para mantener el tamaño del grid
  for (let i = 0; i < linesCleared; i++) {
    grid.value.unshift(Array(columns).fill(0))
  }
  score.value += linesCleared * 10
  level.value = Math.floor(score.value / 50) + 1
  startGravity()
}

const generateNewPiece = () => {
  const newShape = getRandomPiece()
  const newX = Math.floor(columns / 2) - Math.floor(newShape[0].length / 2)
  const newY = 0
  // Si la nueva pieza colisiona inmediatamente, se activa game over.
  if (hasCollision(newX, newY, newShape)) {
    gameOver.value = true
    // Detenemos la gravedad.
    if (gravityInterval) clearInterval(gravityInterval)
    return
  }
  currentPiece.value.shape = newShape
  currentPiece.value.x = newX
  currentPiece.value.y = newY
}

const moveDown = () => {
  if (paused.value || gameOver.value) return
  const newY = currentPiece.value.y + 1
  if (!hasCollision(currentPiece.value.x, newY, currentPiece.value.shape)) {
    currentPiece.value.y = newY
  } else {
    placePiece()
    clearLines()
    generateNewPiece()
  }
}

let gravityInterval: number | undefined
const startGravity = () => {
  // Por cada 2 niveles, reducimos el intervalo en 100ms, con un mínimo de 300ms
  const reduction = Math.floor(level.value / 2) * 100
  const newSpeed = Math.max(1000 - reduction, 300)
  if (gravityInterval) {
    clearInterval(gravityInterval)
  }
  gravityInterval = setInterval(() => {
    moveDown()
  }, newSpeed)
}

const togglePause = () => {
  if (gameOver.value) return
  paused.value = !paused.value
  if (!paused.value) {
    startGravity()
  } else if (gravityInterval) {
    clearInterval(gravityInterval)
  }
}

const keyHandler = (event: KeyboardEvent) => {
  // La tecla "P" para pausar/reanudar
  if (event.code === 'KeyP') {
    togglePause()
    return
  }
  if (paused.value || gameOver.value) return
  switch (event.code) {
    case 'ArrowLeft':
      movePiece(-1)
      break
    case 'ArrowRight':
      movePiece(1)
      break
    case 'ArrowDown':
      moveDown()
      break
    case 'Space':
      event.preventDefault()
      rotatePiece()
      break
  }
}

const initTetris = () => {
  // Reinicia el grid
  grid.value = Array.from({ length: rows }, () => Array(columns).fill(0))
  gameOver.value = false
  paused.value = false
  generateNewPiece()
  startGravity()
  // Registra el listener de teclado
  window.addEventListener('keydown', keyHandler)
}

const cleanupTetris = () => {
  if (gravityInterval) clearInterval(gravityInterval)
  window.removeEventListener('keydown', keyHandler)
}

// Combina el grid base con la pieza actual superpuesta para el renderizado
const mergedGrid = computed(() => {
  const gridCopy = grid.value.map((row) => row.slice())
  const { shape, x, y } = currentPiece.value
  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== 0) {
        const gridRow = y + i
        const gridCol = x + j
        if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < columns) {
          gridCopy[gridRow][gridCol] = cell
        }
      }
    })
  })
  return gridCopy
})

export function useTetris() {
  return {
    grid: mergedGrid,
    currentPiece,
    paused,
    gameOver,
    score,
    level,
    rotatePiece,
    movePiece,
    moveDown,
    startGravity,
    initTetris,
    cleanupTetris,
    togglePause,
  }
}

// // src/composables/useTetris.ts

// import { ref, computed } from 'vue'

// // Definimos las dimensiones del tablero.
// const rows = 20
// const columns = 10

// // Definimos las formas clásicas de Tetris (tetrominós). Cada forma es una matriz 2D.
// // Los números distintos a 0 representan la pieza (podrías usar 1 para todos o colores específicos).
// const tetrominoes = [
//   // I
//   {
//     shape: [
//       [0, 0, 0, 0],
//       [1, 1, 1, 1],
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//     ],
//     color: 'cyan',
//   },
//   // O
//   {
//     shape: [
//       [2, 2],
//       [2, 2],
//     ],
//     color: 'yellow',
//   },
//   // T
//   {
//     shape: [
//       [0, 3, 0],
//       [3, 3, 3],
//       [0, 0, 0],
//     ],
//     color: 'purple',
//   },
//   // L
//   {
//     shape: [
//       [0, 0, 4],
//       [4, 4, 4],
//       [0, 0, 0],
//     ],
//     color: 'orange',
//   },
//   // J
//   {
//     shape: [
//       [5, 0, 0],
//       [5, 5, 5],
//       [0, 0, 0],
//     ],
//     color: 'blue',
//   },
//   // S
//   {
//     shape: [
//       [0, 6, 6],
//       [6, 6, 0],
//       [0, 0, 0],
//     ],
//     color: 'green',
//   },
//   // Z
//   {
//     shape: [
//       [7, 7, 0],
//       [0, 7, 7],
//       [0, 0, 0],
//     ],
//     color: 'red',
//   },
// ]

// // Utilidad para seleccionar aleatoriamente un tetrominó
// const randomTetromino = () => {
//   const index = Math.floor(Math.random() * tetrominoes.length)
//   // Retornamos una copia para no modificar el original.
//   return JSON.parse(JSON.stringify(tetrominoes[index]))
// }

// // Creamos la referencia reactiva para el grid. Es un array 2D.
// const grid = ref<number[][]>([])

// // Función para crear el grid vacío (relleno de 0).
// const createGrid = () => {
//   const newGrid: number[][] = []
//   for (let i = 0; i < rows; i++) {
//     newGrid.push(new Array(columns).fill(0))
//   }
//   grid.value = newGrid
// }

// // Estado del juego: puntaje y nivel.
// const score = ref(0)
// const level = ref(1)

// // La pieza actual, que ahora tendrá forma y color.
// // Inicialmente, se genera una nueva pieza aleatoria centrada.
// const currentPiece = ref({
//   shape: randomTetromino().shape,
//   color: '',
//   x: Math.floor(columns / 2) - 1,
//   y: 0,
// })

// // Función para crear una nueva pieza y reiniciar su posición.
// const createNewPiece = () => {
//   const tetro = randomTetromino()
//   currentPiece.value.shape = tetro.shape
//   currentPiece.value.color = tetro.color
//   currentPiece.value.x = Math.floor(columns / 2) - Math.floor(tetro.shape[0].length / 2)
//   currentPiece.value.y = 0
// }

// // Función que fusiona la pieza actual al grid, es decir, cuando colisiona o llega al fondo.
// const mergePieceToGrid = () => {
//   const { shape, x, y } = currentPiece.value
//   shape.forEach((row, rowIndex) => {
//     row.forEach((cell, colIndex) => {
//       if (cell !== 0) {
//         const gridRow = y + rowIndex
//         const gridCol = x + colIndex
//         if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < columns) {
//           grid.value[gridRow][gridCol] = cell // Podrías asignar el valor o el color.
//         }
//       }
//     })
//   })
// }

// // Función para iniciar o reiniciar el juego.
// const initGame = () => {
//   createGrid() // Inicializa el grid.
//   createNewPiece() // Genera la primera pieza.
//   score.value = 0 // Reinicia el puntaje.
//   level.value = 1 // Reinicia el nivel.
//   startGravity() // Inicia el loop de gravedad.
// }

// // Función para mover la pieza a la izquierda o derecha.
// const movePiece = (direction: 'left' | 'right') => {
//   const newX = direction === 'left' ? currentPiece.value.x - 1 : currentPiece.value.x + 1

//   // Verificamos si la nueva posición colisiona con el borde o con otra pieza
//   if (!hasCollision(newX, currentPiece.value.y, currentPiece.value.shape)) {
//     currentPiece.value.x = newX
//   }
// }

// // Función para rotar la pieza.
// const rotatePiece = () => {
//   const newShape = rotateMatrix(currentPiece.value.shape)
//   let newX = currentPiece.value.x

//   // Si al rotar la pieza sale del tablero, la movemos dentro
//   while (hasCollision(newX, currentPiece.value.y, newShape)) {
//     if (newX > 0) {
//       newX-- // Mueve hacia la izquierda si hay espacio
//     } else {
//       newX++ // Si está en el extremo izquierdo, intenta moverla a la derecha
//     }
//   }

//   // Solo actualiza la pieza si después de los ajustes no hay colisión
//   if (!hasCollision(newX, currentPiece.value.y, newShape)) {
//     currentPiece.value.shape = newShape
//     currentPiece.value.x = newX
//   }
// }

// // Función para "soltar" la pieza, es decir, bajarla una posición.
// const dropPiece = () => {
//   currentPiece.value.y += 1
//   // Verificamos si se produce una colisión con el fondo o con otras piezas.
//   if (hasCollision()) {
//     // Retrocedemos un paso para dejarla justo en la posición válida.
//     currentPiece.value.y -= 1
//     mergePieceToGrid()
//     clearLines() // Opcional: función para borrar líneas completas.
//     createNewPiece()
//   }
// }

// // Función simple de detección de colisión.
// // Se verifica si la pieza actual al moverse se sale del grid o colisiona con celdas ya ocupadas.
// const hasCollision = (x: number, y: number, shape: number[][]): boolean => {
//   for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
//     for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
//       if (shape[rowIndex][colIndex] !== 0) {
//         const newX = x + colIndex
//         const newY = y + rowIndex
//         // Verificar límites del grid.
//         if (newX < 0 || newX >= columns || newY >= rows) {
//           return true
//         }
//         // Verificar si en el grid ya existe un bloque (diferente de 0).
//         if (newY >= 0 && grid.value[newY][newX] !== 0) {
//           return true
//         }
//       }
//     }
//   }
//   return false
// }

// // Función para borrar líneas completas (simplificada).
// const clearLines = () => {
//   // Recorremos las filas y filtramos las que no están completas.
//   const newGrid = grid.value.filter((row) => row.some((cell) => cell === 0))
//   // Calculamos cuántas filas se han eliminado.
//   const cleared = rows - newGrid.length
//   // Agregamos filas vacías al principio.
//   for (let i = 0; i < cleared; i++) {
//     newGrid.unshift(new Array(columns).fill(0))
//   }
//   grid.value = newGrid
//   // Actualizamos puntaje y nivel (esto es un ejemplo simple).
//   score.value += cleared * 10
//   if (cleared > 0 && score.value % 100 === 0) {
//     level.value += 1
//   }
// }

// // Implementamos la "gravedad" con un loop que baja la pieza cada cierto intervalo.
// let gravityInterval: number

// const startGravity = () => {
//   // Limpiamos cualquier intervalo previo.
//   if (gravityInterval) clearInterval(gravityInterval)
//   // Cada 1000ms (1 segundo) se llama a dropPiece. Puedes ajustar este tiempo según el nivel.
//   gravityInterval = setInterval(() => {
//     dropPiece()
//   }, 1000)
// }

// // Computed para mostrar el grid combinado (grid base más la pieza actual superpuesta).
// const mergedGrid = computed(() => {
//   if (!grid.value || grid.value.length === 0) return []
//   const gridCopy = grid.value.map((row) => row.slice())
//   const { shape, x, y } = currentPiece.value
//   shape.forEach((row, rowIndex) => {
//     row.forEach((cell, colIndex) => {
//       if (cell !== 0) {
//         const gridRow = y + rowIndex
//         const gridCol = x + colIndex
//         if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < columns) {
//           gridCopy[gridRow][gridCol] = cell
//         }
//       }
//     })
//   })
//   return gridCopy
// })

// // Retornamos las propiedades y funciones necesarias para la vista.
// export function useTetris() {
//   return {
//     grid: mergedGrid,
//     score,
//     level,
//     initGame,
//     movePiece,
//     rotatePiece,
//     dropPiece,
//   }
// }
