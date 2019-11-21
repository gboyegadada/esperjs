import { store } from "..";
import { 
  COM_STOP,
  COM_HELP,
  COM_ENHANCE,
  CANCEL,
  OKAY,
  invalidCommand,
  COM_BACK,
  receiveCommand,
  ready
} from "../actions/commands";

import {
  COM_MOVE_LEFT, 
  COM_MOVE_RIGHT, 
  COM_MOVE_UP, 
  COM_MOVE_DOWN, 
  COM_CENTER,
} from "../actions/location"

import {
  COM_ZOOM_IN,
  COM_ZOOM_OUT,
} from "../actions/zoom"

import { TOGGLE_POWER } from "../types/action";
import { COM_UPLOADER_BROWSE, COM_UPLOADER_CLEAR } from "../actions/uploader";
import beep, { errorBeep } from "./audioEfx";
import { log } from "../actions/console";
import { LogLevel } from "../types/state";

export interface command {
  command: string
  keywords: string[]
  action: string
  threshold: number
} 
const vocab: command[] = [
  { command: 'stop', keywords: ['stop', 'wait', 'hold', 'ho', 'hoe', 'holdon'], action: COM_STOP, threshold: 1 },
  { command: 'enhance', keywords: ['enhance', 'hands', 'hand', 'han', 'hun'], action: COM_ENHANCE, threshold: 1 },
  { command: 'move left', keywords: ['left', 'lift', 'trackleft', 'tracklist', 'panleft', 'penlist', 'panelist', 'palette', 'palate', 'padlet', 'pilot'], action: COM_MOVE_LEFT, threshold: 1 },
  { command: 'move right', keywords: ['right', 'rite', 'wright', 'write', 'trackrite', 'trackright', 'ride', 'penrite'], action: COM_MOVE_RIGHT, threshold: 1 },
  { command: 'move up', keywords: ['up', 'move-up', 'Up', 'hope'], action: COM_MOVE_UP, threshold: 1 },
  { command: 'move down', keywords: ['move', 'track', 'down', 'gown', 'brown', 'dawn'], action: COM_MOVE_DOWN, threshold: 2 },
  { command: 'zoom out', keywords: ['zoom', 'pull', 'out'], action: COM_ZOOM_OUT, threshold: 2 },
  { command: 'zoom in', keywords: ['zoom', 'move', 'pull', 'pool', 'in', 'up', 'pulling', 'cooling', 'coolin'], action: COM_ZOOM_IN, threshold: 2 },
  { command: 'go back', keywords: ['go', 'back', 'pull', 'pool'], action: COM_BACK, threshold: 2 },
  { command: 'help', keywords: ['help'], action: COM_HELP, threshold: 1 },
  { command: 'center', keywords: ['center', 'centre', 'sent', 'Santa', 'Centre', 'centor', 'centa'], action: COM_CENTER, threshold: 1 },
  { command: 'shutdown', keywords: ['shut', 'down', 'shutdown', 'exit'], action: TOGGLE_POWER, threshold: 1 },
  { command: 'okay', keywords: ['okay', 'yes', 'yup', 'yep', 'roger', 'yeah', 'year', 'confirm', 'conform', 'affirmative', 'confirmed'], action: OKAY, threshold: 1 },
  { command: 'cancel', keywords: ['cancel', 'counsel', 'council', 'no', 'nope', 'abort'], action: CANCEL, threshold: 1 },
  { command: 'upload', keywords: ['upload', 'browse', 'open'], action: COM_UPLOADER_BROWSE, threshold: 1 },
  { command: 'eject', keywords: ['eject', 'close'], action: COM_UPLOADER_CLEAR, threshold: 1 }
]

window.SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
window.SpeechGrammarList = (window as any).webkitSpeechGrammarList || (window as any).SpeechGrammarList

let recognition: SpeechRecognition|null = null

const grammar = '#JSGF V1.0; grammar commands; public <sys> = shutdown | "shut down" | exit | help; public <move> = move | pan | track | scroll; public <zoom> = zoom | pull; public <stop> = stop | wait | "wait a minute" | hold | "hold on"; public <other.action> =  enhance | center; public <confirm> = okay | cancel | yes | no; public <direction> = up | down | left | right; public <command.move> = <move> <direction>; public <command.zoom> = <zoom> (in | out);'

let initialized = false
let lastStartedAt = 0 
let interimTimeoutHandle: NodeJS.Timeout | null = null
let readyTimeoutHandle: NodeJS.Timeout | null = null
let running = false
let stopped = true
let away = false

if (
  'SpeechRecognition' in window && 
  'SpeechGrammarList' in window && 
  window.SpeechRecognition &&
  window.SpeechGrammarList
  ) {
    // speech recognition API supported
    recognition = new window.SpeechRecognition();

    const speechRecognitionList = new window.SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;
    recognition.maxAlternatives = 4

    recognition.onresult = (event) => { 
      console.group('RECOG')

      const { dispatch } = store
      const result = event.results[event.resultIndex]
      console.log('Result:', {result})

      const command = lookup(result)
      if (command) {
          console.groupEnd()
          dispatch(receiveCommand(command))
          dispatch({ type: command.action })
  
          beep()
      } else if (command && undefined !== command) {
          console.log('Skipping command:', {command})
      } else {
          console.groupEnd()
          dispatch(invalidCommand(result))
          
          errorBeep()
      }
  
      if (readyTimeoutHandle) {
        clearTimeout(readyTimeoutHandle)
        readyTimeoutHandle = null
      }
      readyTimeoutHandle = setTimeout(() => dispatch(ready()), 900)
    }

    recognition.onnomatch = () => { 
      store.dispatch(invalidCommand(null))
    }

    recognition.onstart = () => { 
      console.log('Listening...')
      running = true
    }

    recognition.onend = () => { 
      running = false
      if (interimTimeoutHandle || stopped || away) return

      console.log('Restart listening...')
      startListen()
    }

    window.addEventListener('blur', () => {
      away = true
      console.log('Sleep...')

      if (initialized && recognition && running) recognition.stop()
    })

    window.addEventListener('focus', () => {
      away = false
      console.log('Wake...')

      if (initialized && recognition && !stopped) startListen()
    })

    // recognition.onerror = function(event) {
    //   console.log('Speech recognition error detected: ' + event.error);
    //   store.dispatch(invalidCommand(null))
    // }

    initialized = true

} else {
  // speech recognition API not supported
  console.error('It looks like speech recognition API is not yet supported in your browser 😶')
}

const startNow = () => {
  if (!initialized || !recognition || stopped || running) return

  recognition.start()
  running = true
  lastStartedAt = new Date().getTime()
}

export const startListen = () => {
  if (running) stopListen()

  if (!initialized || !recognition) return

  stopped = false

  // play nicely with the browser, and never restart automatically more than once per second
  let timeSinceLastStart = new Date().getTime() - lastStartedAt

  if (timeSinceLastStart < 1000) interimTimeoutHandle = setTimeout(startNow, 1000 - timeSinceLastStart)
  else startNow()
}

export const stopListen = () => {
  if (initialized && recognition && running) {
    recognition.stop()
    console.log('Stopped listening...')
  }

  stopped = true
  if (interimTimeoutHandle) {
    clearInterval(interimTimeoutHandle)
    interimTimeoutHandle = null
  }
}

/**
 * Map recognizer result to speech command.
 * 
 * @param alternatives 
 */
export const lookup = (result: SpeechRecognitionResult) => {
  for (let i = 0; i < vocab.length; i++) {
    if (match(vocab[i], result)) return vocab[i]
  }

  return null
}

/**
 * Check if command is present in recognizer results.
 * 
 * @param command 
 * @param alternatives 
 */
const match = (command: command, alternatives: SpeechRecognitionResult) => {
  for (let i = 0; i < alternatives.length; i++) {
    let intersection = intersect(command.keywords, alternatives[i].transcript.split(' '))

    if (intersection.length >= command.threshold) return true
  }

  return false
}

/**
 * Helper fn: Find words present in both arrays.
 * 
 * @param arr1 
 * @param arr2 
 */
function intersect(arr1: string[], arr2: string[]) {
  // intersection will contain duplicates
  var array_intersection = arr1.filter((x) => (arr2.indexOf(x) !== -1))

  // create Set that will eliminite duplicates
  // convert Set to array using spread
  return [...new Set(array_intersection)]
}
