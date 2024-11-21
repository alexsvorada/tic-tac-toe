import { ref, computed } from 'vue'
import type { Player, GameState, SubBoard } from '../types/ticTacToe'
import { checkWinner, checkDraw, createInitialBoard } from '../utils/gameUtils'

export function useTicTacToe() {
	const players: Player[] = [{ symbol: 'X' }, { symbol: 'O' }]
	const gameState = ref<GameState>({
		currentPlayerIndex: 0,
		winner: null,
		isDraw: false,
		activeBoard: null,
		availableBoards: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		previewNextBoard: [],
		board: createInitialBoard(),
	})

	const currentPlayer = computed(() => players[gameState.value.currentPlayerIndex])
	const gameOver = computed(() => gameState.value.winner !== null || gameState.value.isDraw)

	function removeFromAvailable(boardId: number) {
		gameState.value.availableBoards = gameState.value.availableBoards.filter((id) => id !== boardId)
	}

	function handleWinner(boardId: number, subBoard: SubBoard) {
		subBoard.winner = currentPlayer.value
		removeFromAvailable(boardId)

		const mainBoardSquares = gameState.value.board.map((b) => ({
			id: b.id,
			owner: b.winner,
			hovered: false,
		}))

		if (checkWinner(mainBoardSquares)) {
			gameState.value.winner = currentPlayer.value
		}
	}

	function handleDraw(boardId: number, subBoard: SubBoard) {
		subBoard.isDraw = true
		removeFromAvailable(boardId)

		if (gameState.value.board.every((b) => b.winner !== null || b.isDraw)) {
			gameState.value.isDraw = true
		}
	}

	function updateGameState(squareId: number) {
		gameState.value.activeBoard = gameState.value.availableBoards.includes(squareId) ? squareId : null
		gameState.value.currentPlayerIndex = (gameState.value.currentPlayerIndex + 1) % 2
	}

	function resetGame() {
		gameState.value = {
			currentPlayerIndex: 0,
			winner: null,
			isDraw: false,
			activeBoard: null,
			availableBoards: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			previewNextBoard: [],
			board: createInitialBoard(),
		}
	}

	function makeMove(boardId: number, squareId: number) {
		if (gameOver.value) return
		if (gameState.value.activeBoard !== null && gameState.value.activeBoard !== boardId) return

		const subBoard = gameState.value.board[boardId]
		const square = subBoard.squares[squareId]

		if (subBoard.winner || subBoard.isDraw || square.owner !== null) return

		square.owner = currentPlayer.value

		if (checkWinner(subBoard.squares)) {
			handleWinner(boardId, subBoard)
		} else if (checkDraw(subBoard.squares)) {
			handleDraw(boardId, subBoard)
		}

		updateGameState(squareId)
	}

	function hoverMove(boardId: number, squareId: number) {
		if (
			!gameOver.value &&
			(gameState.value.activeBoard === null || gameState.value.activeBoard === boardId) &&
			!gameState.value.board[boardId].winner &&
			!gameState.value.board[boardId].isDraw &&
			gameState.value.board[boardId].squares[squareId].owner === null
		) {
			gameState.value.board[boardId].squares[squareId].hovered = true

			gameState.value.previewNextBoard = !gameState.value.availableBoards.includes(squareId)
				? [...gameState.value.availableBoards]
				: [squareId]
		}
	}

	function unhoverMove(boardId: number, squareId: number) {
		gameState.value.board[boardId].squares[squareId].hovered = false
		gameState.value.previewNextBoard = []
	}

	return {
		gameState,
		currentPlayer,
		gameOver,
		resetGame,
		makeMove,
		hoverMove,
		unhoverMove,
	}
}
