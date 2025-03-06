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
  grid.value = Array.from({ length: rows }, () => Array(columns).fill(0))
  gameOver.value = false
  paused.value = false
  generateNewPiece()
  startGravity()
  window.addEventListener('keydown', keyHandler)
}

const cleanupTetris = () => {
  if (gravityInterval) clearInterval(gravityInterval)
  window.removeEventListener('keydown', keyHandler)
}

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
