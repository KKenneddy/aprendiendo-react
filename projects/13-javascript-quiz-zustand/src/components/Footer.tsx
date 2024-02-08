import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useGame } from '../hooks/useGame'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const { reset } = useGame()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅${correct} Correctas - ❌${incorrect} Incorrectas - ❓${unanswered} Sin contestar`}</strong>

      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => { reset() }}> Resetear juego</Button>
      </div>
    </footer>
  )
}
