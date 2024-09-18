<script setup lang="ts">
  import { computed } from 'vue'
  import { useTicTacToe } from '../composables/useTicTacToe'
  import TicTacToeSquare from './TicTacToeSquare.vue'

  const { board, currentPlayer, winner, isDraw, gameOver, resetGame, makeMove, hoverMove, unhoverMove } =
    useTicTacToe()

  const gameStatusMessage = computed(() => {
    if (isDraw.value) return "It's a draw!"
    if (winner.value) return `Player ${winner.value.symbol} has won the game!`
  })
</script>

<template>
  <main class="tic-tac-toe-container">
    <header class="game-status">
      <h1>Tic-Tac-Toe</h1>
      <h2 v-if="gameOver">
        {{ gameStatusMessage }}
      </h2>
    </header>

    <article class="game-board">
      <div class="board">
        <TicTacToeSquare
          v-for="square in board"
          :key="square.id"
          :owner="square.owner"
          :hovered="square.hovered"
          :current-player-symbol="currentPlayer.symbol"
          @click="makeMove(square.id)"
          @hover="hoverMove(square.id)"
          @unhover="unhoverMove(square.id)"
        />
      </div>

      <div class="game-controls">
        <button class="reset-board-button" @click="resetGame">Reset</button>
        <p v-if="!gameOver">It's your turn now, player {{ currentPlayer.symbol }}!</p>
      </div>
    </article>
  </main>
</template>

<style scoped>
  .tic-tac-toe-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    min-height: 100vh;
  }

  .game-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-status h1 {
    font-size: 2.5rem;
  }

  .game-status h2 {
    font-size: 1.5rem;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 10px;
  }

  .game-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .game-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .game-controls p {
    margin: 0;
  }

  .reset-board-button {
    padding: 0.6em 1.2em;
  }

  .reset-board-button:hover {
    background-color: #0056b3;
  }
</style>
