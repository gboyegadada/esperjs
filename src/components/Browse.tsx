import React, { useRef, useEffect, ChangeEvent } from 'react'
import { PowerState, LocationState, ZoomState, UploaderState, UploaderStatus, AppState } from '../types/state'
import { useDispatch, useSelector } from 'react-redux'
import { capture, ready } from '../actions/uploader'
import { MdEject } from 'react-icons/md'
import { AiFillSave } from 'react-icons/ai'
import { browse, eject } from '../actions/uploader'

interface Props {
  uploader: UploaderState
  power: PowerState
}

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

export default function Browse() {
  
  const dispatch = useDispatch()
  const { 
    power: { on }, 
    uploader
  }: Props = useSelector((state: AppState) => state)

  const uploaderRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (uploader.status === UploaderStatus.Browse) {
      labelRef.current.click()
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
      if (uploaderRef.current) uploaderRef.current.value = ''
      
      dispatch(ready())
    }, 700)
  } 

  return (
    <>
      {on && !uploader.file && <div className={`btn btn-upload`}>
        <label ref={labelRef} htmlFor="fileupload" className={`d-flex flex-row justify-content-around`}>
          <span className='mr-1'>UPLOAD</span>
          <AiFillSave size={25} />
        </label>

        <input 
          type="file" 
          id="fileupload"
          className='hide' 
          accept="image/*" 
          style={{position: "absolute", top: "20px"}} 
          ref={uploaderRef} 
          onChange={handleUpload}
          />
      </div>}

      {on && uploader.file && <div className={`d-flex flex-row justify-content-around btn btn-eject`} onClick={() => dispatch(eject())}>
        <span className='mr-1'>EJECT</span>
        <MdEject size={25} />
      </div>}
    </>
  )
}

