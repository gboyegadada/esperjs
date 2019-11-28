import React, { useEffect, useRef } from 'react';
import { LogLevel, AppState } from '../types/state';
import { useSelector } from 'react-redux';
import '../styles/console.css'

const getLevelClass = (level: LogLevel) => {
  switch (level) {
    case LogLevel.Info:
      return 'log-level-info'
    case LogLevel.Success:
      return 'log-level-success'
    case LogLevel.Debug:
      return 'log-level-debug'
    case LogLevel.Warning:
      return 'log-level-warning'
    case LogLevel.Error:
      return 'log-level-error'
    case LogLevel.None:
    default:
      return 'log-level-none'
  }
}

export default function Console () {
  
  const power = useSelector((state: AppState) => state.power)
  const console = useSelector((state: AppState) => state.console)

  const ulRef = useRef(null)
  useEffect(() => {
    if (ulRef && ulRef.current) ulRef.current.scrollTop = ulRef.current.scrollHeight
  })

  return (
    <div className='console w-100 pt-2 pb-1 mt-2'>
      <ul ref={ulRef} className={`d-flex flex-col justify-content-start code ${power.on ? '' : 'hide' }`}>
        {console.messages.map((line, k) => (
        <li key={k} data-ts={line.timestamp} className={`${getLevelClass(line.level)}`}>
          {!line.text.includes('\n') ? line.text : line.text.split('\n').map((t, j) => (
          <span key={j}>{t}</span>
          ))}
        </li>
        ))}
      </ul>
    </div>
    )
}
