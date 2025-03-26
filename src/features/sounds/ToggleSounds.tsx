import { memo } from 'react'
import { ToggleSoundsProps } from './sounds.types'

function ToggleSounds({ allowSound, setAllowSound }: ToggleSoundsProps) {
  function handleClick() {
    setAllowSound((allow) => {
      const newValue = !allow
      localStorage.setItem('allowSound', newValue.toString())
      return newValue
    })
  }

  return (
    <button className="btn-sound" onClick={handleClick}>
      {allowSound ? '🔈' : '🔇'}
    </button>
  )
}

export default memo(ToggleSounds)
