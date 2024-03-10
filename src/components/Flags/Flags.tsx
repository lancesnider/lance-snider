'use client'
import { useState } from 'react'

import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import './Flags.scss'
import { isNumber } from 'lodash'

const STATE_MACHINE_NAME = 'State Machine - Flag'

export default function Example() {
  const [flagSolo, setFlagSolo] = useState(0)

  const { rive, RiveComponent } = useRive({
    src: '/rive/flag_animation.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  })

  const handleChange = (
    event: SelectChangeEvent,
    setValue: (value: number) => void,
    riveValue: any
  ) => {
    const valueAsNumber = isNumber(event.target.value) ? event.target.value : 0

    setValue(valueAsNumber)

    riveValue.value = valueAsNumber
  }

  const flagSoloValue = useStateMachineInput(rive, STATE_MACHINE_NAME, 'flagId')

  return (
    <div className='flags'>
      <div className='flags__centered'>
        <div className='flags__container'>
          <RiveComponent className='flags__rive' />
        </div>

        <div className='flags__form'>
          <FormControl fullWidth>
            <InputLabel id='flag-solo'>Country</InputLabel>
            <Select
              labelId='flag-solo'
              id='flag-solo-select'
              value={flagSolo.toString()}
              label='Flags'
              onChange={(e) => handleChange(e, setFlagSolo, flagSoloValue)}
            >
              <MenuItem value={0}>Georgia</MenuItem>
              <MenuItem value={1}>USA</MenuItem>
              <MenuItem value={2}>Mexico</MenuItem>
              <MenuItem value={3}>France</MenuItem>
              <MenuItem value={4}>Wales</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}
