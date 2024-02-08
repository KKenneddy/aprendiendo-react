import { useQuestionsStore } from '../store/questions'

export function useGame () {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestions = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestion)
  const reset = useQuestionsStore(state => state.reset)

  const questionInfo = questions[currentQuestions]

  return {
    questions,
    questionInfo,
    currentQuestions,
    fetchQuestions,
    goNextQuestion,
    goPrevQuestion,
    selectAnswer,
    reset
  }
}
