import './App.css'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { JavaScriptLogo } from './components/JavascriptLogo'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'

function App () {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <JavaScriptLogo />
            <Typography variant="h2" component='h1' color="initial">
                Javascript Quizz
            </Typography>
          </Stack>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
