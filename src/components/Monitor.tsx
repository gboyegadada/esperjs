import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { CommandState, PowerState, LocationState, ZoomState } from '../types/state';
import { connect } from 'react-redux';
import { MAX_ZOOM } from '../reducers/zoom';

interface Props {
  power: PowerState
  location: LocationState
  zoom: ZoomState
}

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

export function Monitor ({ power: { on }, location: l, zoom: z }: Props) {
  const [state, setState] = useState({
    file: null
  })

  const frameRef = useRef(null);
  const slideRef = useRef(null);

  const ratio = 1.6

  const width = Math.round(1920 * z.scale)
  const height = Math.round(width / ratio)
  
  const frameWidth = 894;
  const frameHeight = 210;

  const left = Math.round(((l.x - 100) * (width/2) / 100) + (frameWidth / 2))
  const top = Math.round(((l.y - 100) * (height/2) / 100) + (frameHeight / 2))

  const slideStyle = {
    backgroundSize: `${width}px ${height}px`, // width, height
    backgroundPosition: `${left}px ${top}px`, // top, left
    backgroundImage: `url(${state.file})`,
    backgroundRepeat: 'no-repeat', 
  }
  

  useEffect(() => {
    const w = frameRef.current ? frameRef.current.offsetWidth : 0;
    console.log('Frame width:', w);
  }, [frameRef.current]);

  const handleUpload = (e: HTMLInputEvent) => {
    setState({
      file: URL.createObjectURL(e.target.files[0])
    })
  } 

  return (
    <div className='monitor w-100 mt-2'>
      <div className='frame' ref={frameRef}>
        <div className={`slide${on ? '' : ' hide'}`} style={slideStyle} ref={slideRef}>&nbsp;</div>
      </div>
      <input type="file" className='' style={{position: "absolute", top: "20px"}} onChange={handleUpload}/>
      
    </div>
    )
}

export default connect(({ location, zoom, power }: { location: LocationState, zoom: ZoomState, power: PowerState }) => ({ location, zoom, power }))(Monitor)