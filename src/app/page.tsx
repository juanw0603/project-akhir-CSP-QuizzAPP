"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizWelcome from "@/components/QuizWelcome"
import QuizQuestion from "@/components/QuizQuestion"
import QuizResults from "@/components/QuizResults"
import { useQuiz } from "@/hooks/useQuiz"
import { useRouter } from "next/navigation"
import "@/app/globals.css"

export default function QuizApp() {
    const [currentState, setCurrentState] = useState<"welcome" | "quiz" | "results">("welcome")
    const quiz = useQuiz()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            router.push('/login')
            return
        }
        setUser(JSON.parse(storedUser))
    }, [router])

    const handleStartQuiz = () => {
        setCurrentState("quiz")
        quiz.startQuiz()
    }

    const handleFinishQuiz = () => {
        setCurrentState("results")
        quiz.pauseTimer()
    }

    const handleRestartQuiz = () => {
        setCurrentState("welcome")
        quiz.resetQuiz()
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/login')
    }

    const pageVariants = {
        initial: { opacity: 0, x: 100 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -100 },
    }

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5,
    }

    if (!user) {
        return null // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-white">
                        <p className="text-lg">Welcome, {user.email}</p>
                        <p className="text-sm">Highest Score: {user.highest_score}%</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {currentState === "welcome" && (
                        <motion.div
                            key="welcome"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <QuizWelcome onStart={handleStartQuiz} />
                        </motion.div>
                    )}

                    {currentState === "quiz" && (
                        <motion.div
                            key="quiz"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <QuizQuestion quiz={quiz} onFinish={handleFinishQuiz} />
                        </motion.div>
                    )}

                    {currentState === "results" && (
                        <motion.div
                            key="results"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <QuizResults quiz={quiz} onRestart={handleRestartQuiz} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
