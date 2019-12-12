import React, { useRef } from 'react';
import { PowerState, LocationState, ZoomState, UploaderState, AppState } from '../types/state';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/monitor.css'
import Noise from './Noise';
import Grid from './Grid';
import Logo from './Logo';
import Readout from './Readout';
import Indicator from './Indicator';

interface Props {
  uploader: UploaderState
  power: PowerState
  location: LocationState
  zoom: ZoomState
}

export default function Monitor () {

  const { 
    power: { on }, 
    uploader, 
    location: l, 
    zoom: z 
  }: Props = useSelector((state: AppState) => state)

  const frameRef = useRef(null)
  const slideRef = useRef(null)

  const scale = z.scale / 100 // 120% eq 1.2x ... 150% eq 1.5x ... 70% eq 0.7x ... e.t.c
  const ratio = 1.6

  const width = Math.round(1920 * scale)
  const height = Math.round(width / ratio)
  
  const frameWidth = 894;
  const frameHeight = 210;

  const left = Math.round(((l.x - 100) * (width/2) / 100) + (frameWidth / 2))
  const top = Math.round(((l.y - 100) * (height/2) / 100) + (frameHeight / 2))

  const slideStyle = {
    backgroundSize: `${width}px ${height}px`, // width, height
    backgroundPosition: `${left}px ${top}px`, // top, left
    backgroundImage: `url(${uploader.file})`,
    backgroundRepeat: 'no-repeat', 
  }

  const readoutProps = {
    zm: z.scale, 
    ew: l.x,
    ns: l.y,
  }

  return (
    <div className='monitor w-100 mt-2'>
      <div className='frame' ref={frameRef}>
        <div className={`slide${on ? '' : ' hide'}`} style={slideStyle} ref={slideRef}>&nbsp;</div>
        <div className='logo-wrap h-100 d-flex justify-content-around'>
        { !on && <Logo className='m-center esper-svg' width='160px' /> }
        </div>
        <Indicator successClassName='led led-success' dangerClassName='led led-danger'/>
        <Grid on={on} />
        { on && <Noise uploader={uploader} /> }
        { on && uploader.file && <Readout {...readoutProps}/> }
      </div>
    </div>
    )
}
