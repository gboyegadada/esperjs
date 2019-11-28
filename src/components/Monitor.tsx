import React, { useRef, useEffect, ChangeEvent } from 'react';
import { PowerState, LocationState, ZoomState, UploaderState, UploaderStatus, AppState } from '../types/state';
import { connect, useDispatch, useSelector } from 'react-redux';
import { capture, ready } from '../actions/uploader';

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

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

export default function Monitor () {

  const dispatch = useDispatch()
  const { 
    power: { on }, 
    uploader, 
    location: l, 
    zoom: z 
  }: Props = useSelector((state: AppState) => state)

  const frameRef = useRef(null)
  const slideRef = useRef(null)
  const uploaderRef = useRef(null)

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
  
  useEffect(() => {
    if (uploader.status === UploaderStatus.Browse) {
      uploaderRef.current.click()
    }

    window.addEventListener('focus', handleWindowFocus)

    return () => {
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [uploader.status])

  const handleWindowFocus = () => {
    dispatch(ready())
  }

  const handleUpload = (e: HTMLInputEvent) => {
    dispatch(capture(URL.createObjectURL(e.target.files[0])))

    setTimeout(() => {      
      uploaderRef.current.value = ''
      dispatch(ready())
    }, 700)
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
      <input type="file" className='hide' accept="image/*" style={{position: "absolute", top: "20px"}} ref={uploaderRef} onChange={handleUpload}/>
    </div>
    )
}
