import { store } from "..";
import { 
  processCommand, 
  COM_TRACK_LEFT, 
  COM_TRACK_RIGHT, 
  COM_PAN_LEFT, 
  COM_PAN_RIGHT, 
  COM_STOP
} from "../actions/commands";

export interface command {
  command: string
  action: string
} 
const vocab: command[] = [
  { command: 'track left', action: COM_TRACK_LEFT },
  { command: 'track right', action: COM_TRACK_RIGHT },
  { command: 'pan left', action: COM_PAN_LEFT },
  { command: 'pan right', action: COM_PAN_RIGHT },
  { command: 'stop', action: COM_STOP }
]

window.SpeechRecognition = (window as any).webkitSpeechRecognition || window.SpeechRecognition;

let recognition: SpeechRecognition|null = null

if ('SpeechRecognition' in window) {
    // speech recognition API supported
    recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = function(event) { 
      store.dispatch(processCommand(event.results[event.results.length-1]))

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
    if (match(vocab[i].command, result)) return vocab[i]
  }

  return null
}

/**
 * Check if command is present in recognizer results.
 * 
 * @param command 
 * @param alternatives 
 */
const match = (command: string, alternatives: SpeechRecognitionResult) => {
  const words: string[] = command.split(' ')
  for (let i = 0; i < alternatives.length; i++) {
    let intersection = intersect(words, alternatives[i].transcript.split(' '))

    if (intersection.length === words.length) return true
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
