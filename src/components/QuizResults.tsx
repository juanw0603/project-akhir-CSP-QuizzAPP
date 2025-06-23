"use client"

import { motion } from "framer-motion"
import { Trophy, RotateCcw, CheckCircle, XCircle, Star, BookOpen } from "lucide-react"
import type { UseQuizReturn } from "@/hooks/useQuiz"
import { useEffect, useState } from "react"
import "@/app/globals.css"


interface QuizResultsProps {
    quiz: UseQuizReturn
    onRestart: () => void
}

export default function QuizResults({ quiz, onRestart }: QuizResultsProps) {
    const [showConfetti, setShowConfetti] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const score = quiz.calculateScore()
    const totalQuestions = quiz.questions.length
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

    useEffect(() => {
        const saveScore = async () => {
            const storedUser = localStorage.getItem('user')
            if (!storedUser) return

            const user = JSON.parse(storedUser)
            setIsSaving(true)

            try {
                const response = await fetch('/api/score/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        new_score: percentage
                    })
                })

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new Event('user-updated'));
                        }
                    }
                } else {
                    console.error('Failed to save score')
                }
            } catch (error) {
                console.error('Error saving score:', error)
            } finally {
                setIsSaving(false)
            }
        }

        if (percentage >= 70) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 3000)
        }

        saveScore()
    }, [score, percentage, totalQuestions])

    const getScoreMessage = () => {
        if (percentage >= 90) return "Luar Biasa! 🎉"
        if (percentage >= 80) return "Sangat Baik! 👏"
        if (percentage >= 70) return "Baik! 👍"
        if (percentage >= 60) return "Cukup Baik 😊"
        return "Perlu Belajar Lagi 📚"
    }

    const getScoreColor = () => {
        if (percentage >= 80) return "#10B981" 
        if (percentage >= 60) return "#F59E0B" 
        return "#EF4444"
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    }

    return (
        <motion.div className="quiz-results" variants={containerVariants} initial="hidden" animate="visible">
            {showConfetti && <div className="confetti" />}

            <motion.div className="results-card" variants={itemVariants}>
                <motion.div
                    className="score-circle"
                    style={{ borderColor: getScoreColor() }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 1, delay: 0.5 }}
                >
                    <Trophy size={48} color={getScoreColor()} />
                    <motion.div
                        className="score-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="score-number" style={{ color: getScoreColor() }}>
                            {percentage}
                        </span>
                        <span className="score-label">Skor Anda</span>
                    </motion.div>
                </motion.div>

                <motion.h2 variants={itemVariants} style={{ color: getScoreColor() }}>
                    {getScoreMessage()}
                </motion.h2>

                <motion.div className="score-summary" variants={itemVariants}>
                    <div className="summary-item">
                        <CheckCircle color="#10B981" size={20} />
                        <span>Benar: {score}</span>
                    </div>
                    <div className="summary-item">
                        <XCircle color="#EF4444" size={20} />
                        <span>Salah: {quiz.questions.length - score}</span>
                    </div>
                    <div className="summary-item">
                        <Star color="#F59E0B" size={20} />
                        <span>Total: {quiz.questions.length}</span>
                    </div>
                </motion.div>

                <motion.div className="answers-review" variants={itemVariants}>
                    <h3>Review Jawaban</h3>
                    <div className="answers-list">
                        {quiz.questions.map((question, index) => {
                            const userAnswer = quiz.answers[index]
                            const isCorrect = userAnswer === question.correctAnswer

                            return (
                                <motion.div
                                    key={index}
                                    className="answer-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 + index * 0.1 }}
                                >
                                    <div className="answer-header">
                                        <span className="question-number">#{index + 1}</span>
                                        {isCorrect ? <CheckCircle color="#10B981" size={16} /> : <XCircle color="#EF4444" size={16} />}
                                    </div>
                                    <div className="answer-details">
                                        <p className="question-preview">{question.question.substring(0, 50)}...</p>
                                        <div className="answer-comparison">
                      <span className={`user-answer ${isCorrect ? "correct" : "incorrect"}`}>
                        Anda: {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : "Tidak dijawab"}
                      </span>
                                            {!isCorrect && (
                                                <span className="correct-answer">
                          Benar: {String.fromCharCode(65 + question.correctAnswer)}
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                <motion.button
                    className="restart-button"
                    variants={itemVariants}
                    onClick={onRestart}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(139, 69, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSaving}
                >
                    <RotateCcw size={20} />
                    {isSaving ? 'Menyimpan...' : 'Ulangi Quiz'}
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
