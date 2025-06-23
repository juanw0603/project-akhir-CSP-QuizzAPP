"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { quizData } from "@/data/quizData"

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface UseQuizReturn {
  questions: Question[]
  currentQuestionIndex: number
  answers: (number | undefined)[]
  isStarted: boolean
  timeLeft: number
  totalTime: number
  isTimeWarning: boolean
  isTimeCritical: boolean
  startQuiz: () => void
  resetQuiz: () => void
  getCurrentQuestion: () => Question | null
  selectAnswer: (answerIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  calculateScore: () => number
  pauseTimer: () => void
  resumeTimer: () => void
  setOnTimeUp: (callback: () => void) => void
}

export function useQuiz(totalTimeInSeconds = 300): UseQuizReturn {
  const [questions] = useState<Question[]>(quizData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | undefined)[]>(new Array(quizData.length).fill(undefined))
  const [isStarted, setIsStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds)
  const [isPaused, setIsPaused] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTimeUpRef = useRef<(() => void) | null>(null)

  const isTimeWarning = timeLeft <= 60 && timeLeft > 30 
  const isTimeCritical = timeLeft <= 30 

  const startQuiz = useCallback(() => {
    setIsStarted(true)
    setCurrentQuestionIndex(0)
    setAnswers(new Array(quizData.length).fill(undefined))
    setTimeLeft(totalTimeInSeconds)
    setIsPaused(false)
  }, [totalTimeInSeconds])

  const resetQuiz = useCallback(() => {
    setIsStarted(false)
    setCurrentQuestionIndex(0)
    setAnswers(new Array(quizData.length).fill(undefined))
    setTimeLeft(totalTimeInSeconds)
    setIsPaused(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [totalTimeInSeconds])

  const pauseTimer = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resumeTimer = useCallback(() => {
    setIsPaused(false)
  }, [])

  const getCurrentQuestion = useCallback(() => {
    return questions[currentQuestionIndex] || null
  }, [questions, currentQuestionIndex])

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      setAnswers((prev) => {
        const newAnswers = [...prev]
        newAnswers[currentQuestionIndex] = answerIndex
        return newAnswers
      })
    },
    [currentQuestionIndex],
  )

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }, [currentQuestionIndex, questions.length])

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }, [currentQuestionIndex])

  const calculateScore = useCallback(() => {
    return answers.reduce((score: number, answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        return score + 1
      }
      return score
    }, 0)
  }, [answers, questions])

  
  const setOnTimeUp = useCallback((callback: () => void) => {
    onTimeUpRef.current = callback
  }, [])

  useEffect(() => {
    if (isStarted && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            
            if (onTimeUpRef.current) {
              onTimeUpRef.current()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isStarted, isPaused, timeLeft])

  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    questions,
    currentQuestionIndex,
    answers,
    isStarted,
    timeLeft,
    totalTime: totalTimeInSeconds,
    isTimeWarning,
    isTimeCritical,
    startQuiz,
    resetQuiz,
    getCurrentQuestion,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    calculateScore,
    pauseTimer,
    resumeTimer,
    setOnTimeUp,
  }
}
