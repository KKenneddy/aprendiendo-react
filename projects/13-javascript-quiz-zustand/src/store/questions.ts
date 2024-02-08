import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'

import { type Question } from '../type'
import { getQuestions } from '../service/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestion: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

// set es para actualizar el estado y get es para leer el estado
export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestion: async (limit: number) => {
      const json = await getQuestions()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      // leemos el estado
      const { questions } = get()
      // clonamos las questions
      const newQuestions = structuredClone(questions)
      // buscamos la pregunta en el array de questions y obtenemos su indice
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // obtenemos la pregunta en esa posicion
      const questionInfo = newQuestions[questionIndex]
      // chequemos si es correcta la seleccion del usuario
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      // actualizamos la copia con la nueva informacion de la pregunta y la seleccion del usuario
      if (isCorrectUserAnswer) confetti() // lanzamos confetti si es correcta la seleccion del usuario

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        useSelectedAnswer: answerIndex
      }
      // actualizamos el estado con la nueva copia de questions y la seleccion del usuario
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1

      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion })
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, { name: 'questions-storage' }))
