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

import './Cassowary.scss'
import { isNumber } from 'lodash'

const STATE_MACHINE_NAME = 'State Machine 1'

export default function Example() {
  const [legSolo, setLegSolo] = useState(1)
  const [headSolo, setHeadSolo] = useState(0)
  const [backSolo, setBackSolo] = useState(0)
  const [groundSolo, setGroundSolo] = useState(1)

  const { rive, RiveComponent } = useRive({
    src: '/rive/cassowary.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
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

    // @ts-ignore
    riveValue.value = valueAsNumber
  }

  const legSoloValue = useStateMachineInput(rive, STATE_MACHINE_NAME, 'legSolo')
  const headSoloValue = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'headSolo'
  )
  const backSoloValue = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'backSolo'
  )
  const groundSoloValue = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'groundSolo'
  )

  return (
    <div className='cassowary'>
      <div className='cassowary__centered'>
        <div className='cassowary__container'>
          <RiveComponent className='cassowary__rive' />
        </div>

        <div className='cassowary__form'>
          <FormControl fullWidth>
            <InputLabel id='leg-solo'>Legs</InputLabel>
            <Select
              labelId='leg-solo'
              id='leg-solo-select'
              value={legSolo.toString()}
              label='Legs'
              onChange={(e) => handleChange(e, setLegSolo, legSoloValue)}
            >
              <MenuItem value={0}>Nothing</MenuItem>
              <MenuItem value={1}>Leg Warmers</MenuItem>
              <MenuItem value={2}>Watch</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='head-solo'>Head</InputLabel>
            <Select
              labelId='head-solo'
              id='head-solo-select'
              value={headSolo.toString()}
              label='Head'
              onChange={(e) => handleChange(e, setHeadSolo, headSoloValue)}
            >
              <MenuItem value={0}>Nothing</MenuItem>
              <MenuItem value={1}>Hat</MenuItem>
              <MenuItem value={2}>Teeth</MenuItem>
              <MenuItem value={3}>Monacle</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='back-solo'>Back</InputLabel>
            <Select
              labelId='back-solo'
              id='back-solo-select'
              value={backSolo.toString()}
              label='Back'
              onChange={(e) => handleChange(e, setBackSolo, backSoloValue)}
            >
              <MenuItem value={0}>Nothing</MenuItem>
              <MenuItem value={1}>Speech Bubble</MenuItem>
              <MenuItem value={2}>Saddle</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='ground-solo'>Ground</InputLabel>
            <Select
              labelId='ground-solo'
              id='ground-solo-select'
              value={groundSolo.toString()}
              label='Back'
              onChange={(e) => handleChange(e, setGroundSolo, groundSoloValue)}
            >
              <MenuItem value={0}>Nothing</MenuItem>
              <MenuItem value={1}>Keyboard</MenuItem>
              <MenuItem value={2}>Beer</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}
