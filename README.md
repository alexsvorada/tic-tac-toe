# Ultimate Tic-Tac-Toe

A modern implementation of Ultimate Tic-Tac-Toe built with Vue 3 and TypeScript. This game extends the classic Tic-Tac-Toe by creating a game board made up of nine individual Tic-Tac-Toe boards.

## 🎯 Game Features

-   Interactive game board
-   Turn indicators
-   Win detection
-   Draw detection
-   Board highlighting for valid moves
-   Move previews
-   Reset functionality

## 🎮 Game Rules

1. The game board consists of 9 smaller Tic-Tac-Toe boards arranged in a 3x3 grid
2. The first player can make their first move on any square on any of the nine boards
3. Your move determines which board your opponent must play in next
4. Win small boards to claim them in the larger game
5. Win three small boards in a row to win the game

## 🚀 Features

-   Modern Vue 3 Composition API implementation
-   Full TypeScript support
-   Interactive hover states
-   Visual feedback for valid moves

## 🛠️ Technologies Used

-   Vue 3
-   TypeScript
-   Vite

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ultimate-tic-tac-toe.git
```

2. Navigate to the project directory:

```bash
cd ultimate-tic-tac-toe
```

3. Install dependencies:

```bash
npm install
```

```bash
bun install
```

4. Start the development server:

```bash
npm run dev
```

```bash
bun run dev
```

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── TicTacToeBoard.vue
│   └── TicTacToeSquare.vue
├── composables/
│   └── useTicTacToe.ts
├── types/
│   └── ticTacToe.ts
└── utils/
    └── gameUtils.ts
```
