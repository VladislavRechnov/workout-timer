export type SetDuration = React.Dispatch<React.SetStateAction<number>>
export type SetIsTimerActive = React.Dispatch<React.SetStateAction<boolean>>

export interface Workout {
  name: string
  numExercises: number
}
export type Workouts = Workout[]

export interface CalculatorProps {
  workouts: Workouts
  allowSound: boolean
}

export interface CalculatorTimerProps {
  duration: number
  setDuration: SetDuration
  isTimerActive: boolean
  setIsTimerActive: SetIsTimerActive
}

export interface CalculatorFormProps {
  setDuration: SetDuration
  workouts: Workouts
}

export interface FormInfo {
  selectedWorkout: Workout
  sets: number
  speed: number
  durationBreak: number
}
