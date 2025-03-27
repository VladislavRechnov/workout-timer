import { useState, useEffect, ChangeEvent } from 'react'
import { CalculatorFormProps, FormInfo } from './calculator.types'

export default function CalculatorForm({
  setDuration,
  workouts,
}: CalculatorFormProps) {
  const [formInfo, setFormInfo] = useState<FormInfo>(() => {
    const storedData = localStorage.getItem('formInfo')
    const parcedData = storedData ? (JSON.parse(storedData) as FormInfo) : null

    const initialWorkout = parcedData?.selectedWorkout
      ? workouts.find(
          (workout) => workout.name === parcedData.selectedWorkout.name
        )
      : undefined

    return {
      selectedWorkout: initialWorkout ?? workouts[0],
      sets: parcedData?.sets ?? 3,
      speed: parcedData?.speed ?? 90,
      durationBreak: parcedData?.durationBreak ?? 5,
    }
  })

  const {
    selectedWorkout: { numExercises = 0, name },
    sets,
    speed,
    durationBreak,
  } = formInfo

  useEffect(() => {
    setDuration(numExercises * sets * speed + durationBreak * 60)
  }, [numExercises, name, sets, speed, durationBreak, setDuration])

  useEffect(() => {
    localStorage.setItem('formInfo', JSON.stringify(formInfo))
  }, [formInfo])

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setFormInfo((formInfoPrev) => {
      if (name === 'selectedWorkout') {
        const currentWorkout = workouts.find(
          (workout) => workout.name === value
        )

        return {
          ...formInfoPrev,
          selectedWorkout: currentWorkout ?? formInfoPrev.selectedWorkout,
        }
      }

      return {
        ...formInfoPrev,
        [name]: Number(value),
      }
    })
  }

  if (!workouts.length) return <div>No workouts available</div>

  return (
    <form>
      <div>
        <label>Type of workout</label>
        <select
          name="selectedWorkout"
          onChange={handleFormChange}
          value={formInfo.selectedWorkout.name}
        >
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
          onChange={handleFormChange}
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
          onChange={handleFormChange}
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
          onChange={handleFormChange}
        />
        <span>{durationBreak} minutes/break</span>
      </div>
    </form>
  )
}
