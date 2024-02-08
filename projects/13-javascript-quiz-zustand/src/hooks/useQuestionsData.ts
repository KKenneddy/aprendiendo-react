import { useGame } from './useGame'

export function useQuestionsData () {
  const { questions } = useGame()

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { useSelectedAnswer, correctAnswer } = question
    if (useSelectedAnswer == null) unanswered++
    else if (useSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}
