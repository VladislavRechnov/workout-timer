import { useEffect, useState, memo } from 'react'
import clickSound from '../../assets/audio/ClickSound.m4a'
import CalculatorForm from './CalculatorForm'
import CalculatorTimer from './CalculatorTimer'
import { CalculatorProps } from './calculator.types'

function Calculator({ workouts, allowSound }: CalculatorProps) {
  const [duration, setDuration] = useState(0)
  const [audio] = useState(() => new Audio(clickSound))
  const [userInteracted, setUserInteracted] = useState(false)
  const [isTimerActive, setIsTimerActive] = useState(false)

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true)
    }
    document.addEventListener('click', handleUserInteraction, { once: true })
    return () => {
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  useEffect(() => {
    const playSound = async () => {
      if (!allowSound || !userInteracted) return
      try {
        await audio.play()
      } catch (error) {
        console.error('Autoplay blocked:', error)
      }
    }

    void playSound()
  }, [allowSound, duration, audio, userInteracted, isTimerActive])

  return (
    <>
      <CalculatorForm setDuration={setDuration} workouts={workouts} />
      <CalculatorTimer
        setDuration={setDuration}
        duration={duration}
        isTimerActive={isTimerActive}
        setIsTimerActive={setIsTimerActive}
      />
    </>
  )
}

export default memo(Calculator)
