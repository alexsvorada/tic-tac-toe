import type { Square, SubBoard } from '../types/ticTacToe'

export const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

export function checkWinner(squares: Square[]): boolean {
	return WINNING_COMBINATIONS.some((combination) => {
		const [a, b, c] = combination
		return squares[a].owner && squares[a].owner === squares[b].owner && squares[a].owner === squares[c].owner
	})
}

export function checkDraw(squares: Square[]): boolean {
	return squares.every((square) => square.owner !== null)
}

export function createInitialBoard(): SubBoard[] {
	return Array(9)
		.fill(null)
		.map((_, boardId) => ({
			id: boardId,
			squares: Array(9)
				.fill(null)
				.map((_, squareId) => ({
					id: squareId,
					owner: null,
					hovered: false,
				})),
			winner: null,
			isDraw: false,
		}))
}
