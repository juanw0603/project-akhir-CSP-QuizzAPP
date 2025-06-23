"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Flag } from "lucide-react"
import { useState, useEffect } from "react"
import TimerDisplay from "@/components/TimerDisplay"
import type { UseQuizReturn } from "@/hooks/useQuiz"

interface QuizQuestionProps {
  quiz: UseQuizReturn
  onFinish: () => void
}

export default function QuizQuestion({ quiz, onFinish }: QuizQuestionProps) {
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)

  const currentQuestion = quiz.getCurrentQuestion()
  const progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100

  useEffect(() => {
    const handleTimeUp = () => {
      setShowTimeUpModal(true)
      setTimeout(() => {
        setShowTimeUpModal(false)
        onFinish()
      }, 2000)
    }

    quiz.setOnTimeUp(handleTimeUp)
  }, [quiz, onFinish])

  useEffect(() => {
    if (quiz.isTimeCritical && quiz.timeLeft > 0) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }, [quiz.isTimeCritical, quiz.timeLeft])

  const handleAnswerSelect = (optionIndex: number) => {
    quiz.selectAnswer(optionIndex)
  }

  const handleNext = () => {
    if (quiz.currentQuestionIndex === quiz.questions.length - 1) {
      onFinish()
    } else {
      quiz.nextQuestion()
    }
  }

  const cardVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  }

  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  }

  if (!currentQuestion) return null

  return (
    <div className="quiz-question">
      {/* Timer Display */}
      <TimerDisplay
        timeLeft={quiz.timeLeft}
        totalTime={quiz.totalTime}
        isWarning={quiz.isTimeWarning}
        isCritical={quiz.isTimeCritical}
      />

      {/* Progress Bar */}
      <motion.div className="progress-container">
        <div className="progress-info">
          <span>
            Soal {quiz.currentQuestionIndex + 1} dari {quiz.questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={quiz.currentQuestionIndex}
          className={`question-card ${quiz.isTimeCritical ? "critical-time" : quiz.isTimeWarning ? "warning-time" : ""}`}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
        >
          <motion.h2
            className="question-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentQuestion.question}
          </motion.h2>

          <div className="options-container">
            {currentQuestion.options.map((option: string, index: number) => (
              <motion.button
                key={index}
                className={`option-button ${quiz.answers[quiz.currentQuestionIndex] === index ? "selected" : ""}`}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </motion.button>
            ))}
          </div>

          <div className="navigation-buttons">
            <motion.button
              className="nav-button prev"
              onClick={quiz.prevQuestion}
              disabled={quiz.currentQuestionIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
              Sebelumnya
            </motion.button>

            <motion.button
              className="nav-button next"
              onClick={handleNext}
              disabled={quiz.answers[quiz.currentQuestionIndex] === undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {quiz.currentQuestionIndex === quiz.questions.length - 1 ? (
                <>
                  <Flag size={20} />
                  Selesai
                </>
              ) : (
                <>
                  Selanjutnya
                  <ChevronRight size={20} />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Time Up Modal */}
      <AnimatePresence>
        {showTimeUpModal && (
          <motion.div
            className="time-up-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="time-up-modal"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <motion.div
                className="time-up-icon"
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                ⏰
              </motion.div>
              <h2>Waktu Habis!</h2>
              <p>Quiz akan berakhir dan menampilkan hasil...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
