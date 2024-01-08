import { useCallback, useEffect, useState } from "react"

export const useTimer = () => {
  const [time, setTime] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null)
  const [timerComplete, setTimerComplete] = useState(false)

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
      setTimerId(interval)
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerRunning])

  useEffect(() => {
    if (time === 0) {
      setTimerComplete(true)
      setTimerRunning(false)
      if (timerId) clearInterval(timerId)
    }
  }, [time])


  const startTimer = useCallback(() => {
    setTimerRunning(true)
    setTimerComplete(false)
  }, [])




  const resetTimer = useCallback(() => {
    setTime(60)
    setTimerComplete(false)
  }, [])


  return { startTimer, resetTimer, time, timerRunning, timerComplete }
}