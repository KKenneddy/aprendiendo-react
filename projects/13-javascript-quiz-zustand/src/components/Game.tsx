import { Stack, IconButton } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

import { Footer } from './Footer'
import { Question } from './Question'

import { useGame } from '../hooks/useGame'

export const Game = () => {
  const {
    questions,
    questionInfo,
    currentQuestions,
    goNextQuestion,
    goPrevQuestion
  } = useGame()

  return (
    <>
      <Stack sx={{ mt: 4 }} direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton
          aria-label="Ir a la pregunta previa"
          disabled={currentQuestions === 0}
          onClick={() => { goPrevQuestion() }}
        >
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestions + 1} / {questions.length}

        <IconButton
          aria-label="Ir a la pregunta siguiente"
          disabled={currentQuestions === (questions.length - 1) || questionInfo.useSelectedAnswer === undefined}
          onClick={() => { goNextQuestion() }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo}/>
      <Footer />
    </>
  )
}
