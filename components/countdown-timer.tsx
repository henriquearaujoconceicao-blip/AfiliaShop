"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endTime: string
  compact?: boolean
}

export function CountdownTimer({ endTime, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - Date.now()
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-warning">
        <Clock className="h-3 w-3" />
        <span>
          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-1.5">
      <Clock className="h-4 w-4 text-warning" />
      <div className="flex items-center gap-1 font-mono text-sm font-bold text-warning">
        <span className="rounded bg-warning/20 px-1.5 py-0.5">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span>:</span>
        <span className="rounded bg-warning/20 px-1.5 py-0.5">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span className="rounded bg-warning/20 px-1.5 py-0.5">{String(timeLeft.seconds).padStart(2, "0")}</span>
      </div>
    </div>
  )
}
