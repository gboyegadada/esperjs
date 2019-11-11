import { store } from "..";
import { 
  processCommand, 
  COM_MOVE_LEFT, 
  COM_MOVE_RIGHT, 
  COM_MOVE_UP, 
  COM_MOVE_DOWN, 
  COM_STOP,
  COM_HELP,
  COM_ENHANCE,
  COM_CENTER,
  COM_ZOOM_IN,
  COM_ZOOM_OUT
} from "../actions/commands";

export interface command {
  command: string
  keywords: string[]
  action: string
} 
const vocab: command[] = [
  { command: 'move left', keywords: ['left', 'lift', 'trackleft', 'tracklist', 'panleft', 'penlist', 'panelist', 'palette', 'palate', 'padlet', 'pilot'], action: COM_MOVE_LEFT },
  { command: 'move right', keywords: ['right', 'wright', 'write', 'trackrite', 'trackright', 'ride', 'penrite'], action: COM_MOVE_RIGHT },
  { command: 'move up', keywords: ['up', 'move-up', 'Up', 'hope'], action: COM_MOVE_UP },
  { command: 'move down', keywords: ['down', 'gown', 'brown', 'dawn'], action: COM_MOVE_DOWN },
  { command: 'zoom in', keywords: ['in'], action: COM_ZOOM_IN },
  { command: 'zoom out', keywords: ['out'], action: COM_ZOOM_OUT },
  { command: 'stop', keywords: ['stop', 'wait', 'hold', 'ho', 'hoe', 'holdon'], action: COM_STOP },
  { command: 'help', keywords: ['help'], action: COM_HELP },
  { command: 'enhance', keywords: ['enhance', 'hands', 'hand', 'han', 'hun'], action: COM_ENHANCE },
  { command: 'center', keywords: ['center'], action: COM_CENTER }
]

window.SpeechRecognition = (window as any).webkitSpeechRecognition || window.SpeechRecognition;

let recognition: SpeechRecognition|null = null

if ('SpeechRecognition' in window) {
    // speech recognition API supported
    recognition = new window.SpeechRecognition();

    recognition.interimResults = false;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = function(event) { 
      store.dispatch(processCommand(event.results[event.resultIndex]))

      console.group('RECOGNITION')
      console.log(event) 
    }

} else {
  // speech recognition API not supported
  throw 'speech recognition API not supported'
}

export default recognition

/**
 * Map recognizer result to speech command.
 * 
 * @param alternatives 
 */
export const lookup = (result: SpeechRecognitionResult) => {
  for (let i = 0; i < vocab.length; i++) {
    if (match(vocab[i].keywords, result)) return vocab[i]
  }

  return null
}

/**
 * Check if command is present in recognizer results.
 * 
 * @param command 
 * @param alternatives 
 */
const match = (keywords: string[], alternatives: SpeechRecognitionResult) => {
  for (let i = 0; i < alternatives.length; i++) {
    let intersection = intersect(keywords, alternatives[i].transcript.split(' '))

    if (intersection.length >= 1) return true
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
