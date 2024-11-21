<script setup lang="ts">
	import { computed } from 'vue'
	import { useTicTacToe } from '../composables/useTicTacToe'
	import TicTacToeSquare from './TicTacToeSquare.vue'

	const { gameState, currentPlayer, resetGame, makeMove, hoverMove, unhoverMove } = useTicTacToe()

	const gameStatusMessage = computed(() => {
		if (gameState.value.isDraw) return "It's a draw!"
		if (gameState.value.winner) return `Player ${gameState.value.winner.symbol} has won the game!`
		return `It's your turn now, player ${currentPlayer.value.symbol}!`
	})
</script>

<template>
	<div class="container">
		<h1>Ultimate Tic-Tac-Toe</h1>
		<h2>{{ gameStatusMessage }}</h2>

		<div class="board">
			<div
				v-for="subBoard in gameState.board"
				:key="subBoard.id"
				class="sub-board"
				:class="{
					active:
						(gameState.activeBoard === null && gameState.availableBoards.includes(subBoard.id)) ||
						gameState.activeBoard === subBoard.id,
					completed: subBoard.winner || subBoard.isDraw,
					'preview-active': gameState.previewNextBoard.includes(subBoard.id),
				}">
				<div v-if="subBoard.winner" class="overlay">
					{{ subBoard.winner.symbol }}
				</div>
				<div v-else class="grid">
					<TicTacToeSquare
						v-for="square in subBoard.squares"
						:key="square.id"
						:owner="square.owner"
						:hovered="square.hovered"
						:current-player-symbol="currentPlayer.symbol"
						:is-in-active-board="gameState.activeBoard === null || gameState.activeBoard === subBoard.id"
						@click="makeMove(subBoard.id, square.id)"
						@hover="hoverMove(subBoard.id, square.id)"
						@unhover="unhoverMove(subBoard.id, square.id)" />
				</div>
			</div>
		</div>

		<button class="reset" @click="resetGame">Reset</button>
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		min-height: 100vh;
		padding: 24px;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0;
	}

	.board {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		padding: 10px;
		border-radius: 8px;
	}

	.sub-board {
		position: relative;
		padding: 5px;
		opacity: 0.5;
		transition: opacity 0.3s ease;
		border-radius: 10%;
		border: 2px solid transparent;
	}

	.sub-board.active {
		opacity: 1;
		border-color: whitesmoke;
	}

	.sub-board.preview-active {
		opacity: 0.8;
		border-style: dashed;
		border-color: whitesmoke;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 72px;
	}

	.reset {
		padding: 0.6em 1.2em;
		font-size: 1em;
		background-color: #333;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.reset:hover {
		background-color: white;
		color: #333;
	}
</style>
