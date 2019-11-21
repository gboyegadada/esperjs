import React from 'react';
import { PowerState, ConsoleSate, LogLevel } from '../types/state';
import { connect } from 'react-redux';
import Indicator from './Indicator';
import '../styles/console.css'

interface Props {
    console: ConsoleSate
    power: PowerState
}

const getLevelClass = (level: LogLevel) => {
  switch (level) {
    case LogLevel.Info:
      return 'log-level-info'
    case LogLevel.Debug:
      return 'log-level-debug'
    case LogLevel.Warning:
      return 'log-level-warning'
    case LogLevel.Error:
      return 'log-level-error'

  }
}

export function Console ({ console, power }: Props) {
    return (
        <div className='console w-100 pt-2 pb-1 mt-2'>
            <Indicator successClassName='led led-success' dangerClassName='led led-danger'/>
            <ul className={`d-flex flex-col justify-content-start code ${power.on ? '' : 'hide' }`}>
              {console.messages.map((line, k) => (
                <li key={k} data-ts={line.timestamp} className={`${getLevelClass(line.level)}`}>{line.text}</li>
              ))}
            </ul>
        </div>
        )
}

export default connect(({ power, console }: { power: PowerState, console: ConsoleSate }) => ({ power, console }))(Console)