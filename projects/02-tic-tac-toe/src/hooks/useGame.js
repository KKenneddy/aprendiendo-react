import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from '../constants'
import { checkWinner } from '../logic/board'
import { resetGameStorage, saveGameToStorage } from '../logic/storage'

export const useGame = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // chequeamos que no haya algo en esa posición
    if (board[index] || winner) return

    // actualizamos el board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiamos el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    // revisar si tenemos ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(() => newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  return {
    board,
    turn,
    winner,
    resetGame,
    updateBoard
  }
}
