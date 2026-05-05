import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function derivedActivePlayer(gameTurns) {
	let curPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		curPlayer = "O";
	}
	return curPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	// const [hasWinner, setHasWinner] = useState(false);
	// const [activePlayer, setActivePlayer] = useState('X');

	let activePlayer = derivedActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map((row) => [...row])]; // Deep copy of the initial game board

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

  let winner = null;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquare = gameBoard[combination[0].row][combination[0].column];
		const secondSquare = gameBoard[combination[1].row][combination[1].column];
		const thirdSquare = gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquare &&
			firstSquare === secondSquare &&
			firstSquare === thirdSquare
		) {
      winner = firstSquare;
		}
	}

  const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		// setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));

		setGameTurns((prevturns) => {
			const activePlayer = derivedActivePlayer(prevturns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: activePlayer },
				...prevturns,
			];
			return updatedTurns;
		});
	}

  function resetGame() {
    setGameTurns([]);
  }

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === "O"}
					/>
				</ol>

        { (winner || hasDraw) && <GameOver winner={winner} onRestart={resetGame} />}

				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>

			<Log turns={gameTurns} />

		</main>
	);
}

export default App;
