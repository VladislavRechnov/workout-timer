import { memo } from 'react'
import { ToggleSoundsProps } from './sounds.types'

import unmute from '../../assets/icons/unmute .png'
import mute from '../../assets/icons/mute.png'

function ToggleSounds({ allowSound, setAllowSound }: ToggleSoundsProps) {
  function handleClick() {
    setAllowSound((allow) => {
      const newValue = !allow
      localStorage.setItem('allowSound', newValue.toString())
      return newValue
    })
  }

  return (
    <button type="button" className="btn-sound" onClick={handleClick}>
      {allowSound ? (
        <img src={unmute} alt="unmute" />
      ) : (
        <img src={mute} alt="mute" />
      )}
    </button>
  )
}

export default memo(ToggleSounds)
