import { useEffect, useMemo, useState } from 'react'
import Calculator from './features/calculator/Calculator.tsx'
import ToggleSounds from './features/sounds/ToggleSounds.tsx'

import { Workouts } from './features/calculator/calculator.types.ts'

function App() {
  const [allowSound, setAllowSound] = useState(() => {
    return localStorage.getItem('allowSound') === 'true'
  })
  const [currentTime, setCurrentTime] = useState(new Date())

  const formattedTime = useMemo(() => {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(currentTime)
  }, [currentTime])

  const partOfDay = useMemo(() => {
    return formattedTime.slice(-2)
  }, [formattedTime])

  const workouts: Workouts = useMemo(
    () => [
      {
        name: 'Full-body workout',
        numExercises: partOfDay === 'AM' ? 9 : 8,
      },
      {
        name: 'Arms + Legs',
        numExercises: 2,
      },
      {
        name: 'Arms only',
        numExercises: 3,
      },
      {
        name: 'Legs only',
        numExercises: 4,
      },
      {
        name: 'Core only',
        numExercises: partOfDay === 'AM' ? 5 : 4,
      },
    ],
    [partOfDay]
  )

  useEffect(function () {
    const id = setInterval(function () {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {formattedTime}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  )
}

export default App
