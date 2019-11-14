import React, { useRef, useEffect, ChangeEvent } from 'react';
import { PowerState, LocationState, ZoomState, UploaderState, UploaderStatus } from '../types/state';
import { connect, useDispatch } from 'react-redux';
import { capture } from '../actions/uploader';

interface Props {
  uploader: UploaderState
  power: PowerState
  location: LocationState
  zoom: ZoomState
}

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

export function Monitor ({ power: { on }, uploader, location: l, zoom: z }: Props) {

  const dispatch = useDispatch()

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
  
  useEffect(() => {
    if (uploader.status === UploaderStatus.Browse) uploaderRef.current.click()
  }, [uploader.status, uploaderRef.current])

  const handleUpload = (e: HTMLInputEvent) => {
    dispatch(capture(URL.createObjectURL(e.target.files[0])))
  } 

  return (
    <div className='monitor w-100 mt-2'>
      <div className='frame' ref={frameRef}>
        <div className={`slide${on ? '' : ' hide'}`} style={slideStyle} ref={slideRef}>&nbsp;</div>
      </div>
      <input type="file" className='hide' accept="image/*" style={{position: "absolute", top: "20px"}} ref={uploaderRef} onChange={handleUpload}/>
    </div>
    )
}

export default connect(({ location, zoom, uploader, power }: { uploader: UploaderState, location: LocationState, zoom: ZoomState, power: PowerState }) => ({ uploader, location, zoom, power }))(Monitor)