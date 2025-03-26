import { useState, useEffect, ChangeEvent } from 'react'
import { CalculatorFormProps, FormInfo } from './calculator.types'

export default function CalculatorForm({
  setDuration,
  workouts,
}: CalculatorFormProps) {
  const [formInfo, setFormInfo] = useState<FormInfo>(() => {
    const storedFormInfo = localStorage.getItem('formInfo')
    const localFormInfo = storedFormInfo
      ? (JSON.parse(storedFormInfo) as FormInfo)
      : null

    if (localFormInfo) {
      const currentWorkout = workouts.find(
        (workout) => workout.name === localFormInfo.selectedWorkout.name
      )

      localFormInfo.selectedWorkout.numExercises = currentWorkout
        ? currentWorkout.numExercises
        : localFormInfo.selectedWorkout.numExercises
    }

    return localFormInfo
      ? localFormInfo
      : {
          selectedWorkout: workouts[0],
          sets: 3,
          speed: 90,
          durationBreak: 5,
        }
  })

  const {
    selectedWorkout: { numExercises, name },
    sets,
    speed,
    durationBreak,
  } = formInfo

  function handleFormInfoChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    setFormInfo((formInfo) => {
      if (e.target.name === 'selectedWorkout') {
        const currentWorkout = workouts.find(
          (workout) => workout.name === e.target.value
        )

        return {
          ...formInfo,
          selectedWorkout: {
            name: currentWorkout ? currentWorkout.name : '<>',
            numExercises: currentWorkout ? +currentWorkout.numExercises : 0,
          },
        }
      }

      return {
        ...formInfo,
        [e.target.name]: +e.target.value,
      }
    })
  }

  useEffect(() => {
    setDuration(numExercises * sets * speed + durationBreak * 60)
  }, [numExercises, name, sets, speed, durationBreak, setDuration])

  useEffect(() => {
    localStorage.setItem('formInfo', JSON.stringify(formInfo))
  }, [formInfo])

  return (
    <form>
      <div>
        <label>Type of workout</label>
        <select name="selectedWorkout" onChange={handleFormInfoChange}>
          {workouts.map((workout) => (
            <option value={workout.name} key={workout.name}>
              {workout.name} ({workout.numExercises} exercises)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>How many sets?</label>
        <input
          type="range"
          min="1"
          max="5"
          name="sets"
          value={sets}
          onChange={handleFormInfoChange}
        />
        <span>{sets}</span>
      </div>
      <div>
        <label>How fast are you?</label>
        <input
          type="range"
          min="30"
          max="180"
          step="30"
          name="speed"
          value={speed}
          onChange={handleFormInfoChange}
        />
        <span>{speed} sec/exercise</span>
      </div>
      <div>
        <label>Break length</label>
        <input
          type="range"
          min="1"
          max="10"
          name="durationBreak"
          value={durationBreak}
          onChange={handleFormInfoChange}
        />
        <span>{durationBreak} minutes/break</span>
      </div>
    </form>
  )
}
