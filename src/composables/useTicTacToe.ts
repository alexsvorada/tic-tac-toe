import { ref, computed } from 'vue'

export interface Player {
  symbol: string
}

export interface Square {
  id: number
  owner: Player | null
  hovered: boolean
}

export function useTicTacToe() {
  const players: Player[] = [{ symbol: 'X' }, { symbol: 'O' }]
  const currentPlayerIndex = ref(0)
  const winner = ref<Player | null>(null)
  const isDraw = ref(false)

  const board = ref<Square[]>(
    Array(9)
      .fill(null)
      .map((_, id) => ({ id, owner: null, hovered: false }))
  )

  const currentPlayer = computed(() => players[currentPlayerIndex.value])

  const gameOver = computed(() => winner.value !== null || isDraw.value)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function resetGame() {
    board.value.forEach((square) => {
      square.owner = null
      square.hovered = false
    })
    currentPlayerIndex.value = 0
    winner.value = null
    isDraw.value = false
  }

  function checkWinner(): boolean {
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination
      return (
        board.value[a].owner &&
        board.value[a].owner === board.value[b].owner &&
        board.value[a].owner === board.value[c].owner
      )
    })
  }

  function checkDraw(): boolean {
    return board.value.every((square) => square.owner !== null)
  }

  function makeMove(squareId: number) {
    if (gameOver.value || board.value[squareId].owner !== null) return

    board.value[squareId].owner = currentPlayer.value

    if (checkWinner()) {
      winner.value = currentPlayer.value
    } else if (checkDraw()) {
      isDraw.value = true
    } else {
      currentPlayerIndex.value = (currentPlayerIndex.value + 1) % 2
    }
  }

  function hoverMove(squareId: number) {
    if (!gameOver.value && board.value[squareId].owner === null && !board.value[squareId].hovered) {
      board.value[squareId].hovered = true
    }
  }

  function unhoverMove(squareId: number) {
    if (board.value[squareId].hovered) {
      board.value[squareId].hovered = false
    }
  }

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameOver,
    resetGame,
    makeMove,
    hoverMove,
    unhoverMove,
  }
}
