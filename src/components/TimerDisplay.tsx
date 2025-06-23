"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface TimerDisplayProps {
  timeLeft: number
  totalTime: number
  isWarning: boolean
  isCritical: boolean
}

export default function TimerDisplay({ timeLeft, totalTime, isWarning, isCritical }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = (timeLeft / totalTime) * 100

  const getTimerColor = () => {
    if (isCritical) return "#EF4444"
    if (isWarning) return "#F59E0B"
    return "#10B981"
  }

  return (
    <div className={`timer-display ${isCritical ? "critical" : isWarning ? "warning" : ""}`}>
      <div className="timer-content">
        <div className="timer-icon">
          <Clock size={24} color={getTimerColor()} />
        </div>
        <div className="timer-info">
          <div className="timer-text" style={{ color: getTimerColor() }}>
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </div>
          {isCritical && <div className="timer-warning" style={{ color: getTimerColor() }}>Waktu hampir habis!</div>}
        </div>
      </div>
      <div className="timer-progress">
        <motion.div
          className="timer-progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getTimerColor(),
          }}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {isCritical && <div className="timer-critical-overlay" />}
    </div>
  )
}
