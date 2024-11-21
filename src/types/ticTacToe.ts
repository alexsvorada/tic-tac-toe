export interface Player {
	symbol: string
}

export interface Square {
	id: number
	owner: Player | null
	hovered: boolean
}

export interface SubBoard {
	id: number
	squares: Square[]
	winner: Player | null
	isDraw: boolean
}

export interface GameState {
	currentPlayerIndex: number
	winner: Player | null
	isDraw: boolean
	activeBoard: number | null
	availableBoards: number[]
	previewNextBoard: number[]
	board: SubBoard[]
}
