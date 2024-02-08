import Button from '@mui/material/Button'

import { useGame } from '../hooks/useGame'

const LIMIT_QUESTIONS = 10

export function Start () {
  const { fetchQuestions } = useGame()

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button variant="contained" onClick={handleClick} sx={{ mt: 4 }}>
      ¡Empezar!
    </Button>
  )
}
