import { useEffect } from 'react'
import { CalculatorTimerProps } from './calculator.types'

export default function CalculatorTimer({
  duration,
  setDuration,
  isTimerActive,
  setIsTimerActive,
}: CalculatorTimerProps) {
  const mins = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)

  function handleInc() {
    setDuration((duration) => duration + 60)
  }

  function handleDec() {
    setDuration((duration) => duration - 60)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((duration) => {
        if (duration <= 0) {
          clearInterval(timer)
          return 0
        }

        return duration - 1
      })
    }, 1000)

    if (!isTimerActive || duration <= 0) {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [duration, isTimerActive, setDuration])

  return (
    <>
      <section>
        {duration > 0 ? (
          <>
            <button
              type="button"
              className="control-button"
              onClick={handleDec}
            >
              –
            </button>
            <p>
              {mins < 10 && '0'}
              {mins}:{seconds < 10 && '0'}
              {seconds}
            </p>
            <button
              type="button"
              className="control-button"
              onClick={handleInc}
            >
              +
            </button>
          </>
        ) : (
          <p>FINISH</p>
        )}
      </section>
      <button
        type="button"
        className="timer-button"
        disabled={duration === 0}
        onClick={() => {
          setIsTimerActive((isTimerActive) => !isTimerActive)
        }}
      >
        {isTimerActive ? 'END' : 'START'}
      </button>
    </>
  )
}
