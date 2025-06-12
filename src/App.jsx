import { use, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/square.jsx";
import {TURNS, WINNER_COMBOS} from "./components/constans.js";
import { checkWinnerFrom } from "./logica/board.js";
import { WinnerModal } from "./logica/WinnerModal.jsx";
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  
  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };
  const updateBoard = (index) => {
    //evitar jugar si hay un ganador
    if (board[index] || winner) return; // prevenir sobreescribir casillas

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti(); // Efecto de confeti al ganar
      //alert(`ganó ${newWinner}`);
      setWinner(newWinner);
      //alert(`ganado, ${newWinner}`)
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Juego de tres en raya "Michi"</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );  
}

export default App;
