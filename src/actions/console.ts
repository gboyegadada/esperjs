import { LogLevel } from "../types/state"

export const CON_ECHO = 'CON_ECHO'
export const CON_LOG = 'CON_LOG'
export const CON_CLEAR = 'CON_CLEAR'

export function echo(message: string, level: LogLevel = LogLevel.Info) {
  return {
    type: CON_ECHO,
    message,
    level,
  }
}

export function log(message: string, level: LogLevel = LogLevel.Info) {
  return {
    type: CON_LOG,
    message,
    level,
  }
}

export function clear() {
  return {
    type: CON_CLEAR,
  }
}