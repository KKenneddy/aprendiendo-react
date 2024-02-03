import { TURNS } from './constants'
import { WinnerModal, Tablero, ChangeTurn } from './components'
import { useGame } from './hooks/useGame'

function App () {
  const { turn, winner, board, resetGame, updateBoard } = useGame()

  return (
    <main className='board'>
      <h1> tic-tac-toe </h1>

      <button onClick={resetGame}>Reset del juego</button>

      <Tablero board={board} updateBoard={updateBoard} />

      <ChangeTurn turn={turn} turns={TURNS} />

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
