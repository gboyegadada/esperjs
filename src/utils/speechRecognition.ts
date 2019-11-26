import { store } from "..";
import { 
  invalidCommand,
  receiveCommand,
  ready
} from "../actions/commands";


import SpeechRecognitionInterface from '../types/SpeechRecognitionInterface'
import SpeechRecogAPI, {vocab as API_VOCAB} from '../services/SpeechRecogAPI'
import SpeechRecogTF, {vocab as TF_VOCAB} from '../services/SpeechRecogTF'
import beep, { errorBeep } from "./audioEfx";

export interface command {
  command: string
  keywords: string[]
  action: string
  threshold: number
} 

let readyTimeoutHandle: NodeJS.Timeout | null = null

let recognizer: SpeechRecognitionInterface = new SpeechRecogAPI()

let vocab: command[]
if (recognizer.initialized) {
  vocab = API_VOCAB
} else {
  vocab = TF_VOCAB
  recognizer = new SpeechRecogTF()
}

const unsub = recognizer.subscribe((result: any) => { 
      console.group('RECOG')

      const { dispatch } = store
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
    })


export const startListen = () => {
  return recognizer.startListening()
}

export const stopListen = () => {
  recognizer.stopListening()
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
