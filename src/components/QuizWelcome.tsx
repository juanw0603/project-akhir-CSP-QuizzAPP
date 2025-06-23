"use client"

import { motion } from "framer-motion"
import { Play, BookOpen, Clock, Trophy } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import { getBestQuizScore, StoredQuizResult } from "@/data/quizStorage"
import { quizData } from "@/data/quizData"
import "@/app/globals.css"


interface QuizWelcomeProps {
    onStart: () => void
}

export default function QuizWelcome({ onStart }: QuizWelcomeProps) {
    const [bestScore, setBestScore] = useState<StoredQuizResult | null>(null);
    const [topUser, setTopUser] = useState<{ username?: string; email: string; highest_score: number } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBestScore(getBestQuizScore());
        }
    }, []);

    useEffect(() => {
        async function fetchTopUser() {
            try {
                const res = await fetch('https://xzphvmwoxcaifzdnmsjw.supabase.co/rest/v1/users?select=username,email,highest_score&order=highest_score.desc&limit=1', {
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
                    },
                });
                const users = await res.json();
                if (users && users.length > 0) {
                    setTopUser(users[0]);
                }
            } catch (err) {
                setTopUser(null);
            }
        }
        fetchTopUser();
    }, []);

    const defaultQuizDurationMinutes = 10; 
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    return (
        <motion.div className="quiz-welcome" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="welcome-card" variants={itemVariants}>
                <motion.div
                    className="welcome-icon"
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                    }}
                >
                    <BookOpen size={64} />
                </motion.div>

                <motion.h1 variants={itemVariants}>Quiz Pengetahuan Indonesia</motion.h1>

                <motion.p variants={itemVariants}>
                    Uji pengetahuan Anda tentang Indonesia dengan {quizData.length} soal menarik!
                </motion.p>

                <motion.div className="quiz-info" variants={itemVariants}>
                    <div className="info-item">
                        <BookOpen size={20} />
                        <span>{quizData.length} Soal</span>
                    </div>
                    <div className="info-item">
                        <Clock size={20} />
                        <span>{defaultQuizDurationMinutes} Menit</span>
                    </div>
                    <div className="info-item">
                        <Trophy size={20} />
                        <span>
                            Skor Terbaik: {topUser ? `${topUser.highest_score}% oleh ${topUser.username ? topUser.username : topUser.email}` : 'N/A'}
                        </span>
                    </div>
                </motion.div>

                <motion.button
                    className="start-button"
                    variants={itemVariants}
                    onClick={onStart}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(139, 69, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Play size={20} />
                    Mulai Quiz
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
