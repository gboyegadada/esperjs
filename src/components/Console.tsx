import React, { useEffect, useRef } from 'react';
import { PowerState, ConsoleSate, LogLevel } from '../types/state';
import { connect } from 'react-redux';
import '../styles/console.css'

interface Props {
    console: ConsoleSate
    power: PowerState
}

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

export function Console ({ console, power }: Props) {
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

export default connect(({ power, console }: { power: PowerState, console: ConsoleSate }) => ({ power, console }))(Console)