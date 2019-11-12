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
  COM_ZOOM_OUT,
  CANCEL,
  OKAY,
  invalidCommand
} from "../actions/commands";
import { TOGGLE_POWER } from "../types/action";

export interface command {
  command: string
  keywords: string[]
  action: string
  threshold: number
} 
const vocab: command[] = [
  { command: 'move left', keywords: ['left', 'lift', 'trackleft', 'tracklist', 'panleft', 'penlist', 'panelist', 'palette', 'palate', 'padlet', 'pilot'], action: COM_MOVE_LEFT, threshold: 1 },
  { command: 'move right', keywords: ['right', 'wright', 'write', 'trackrite', 'trackright', 'ride', 'penrite'], action: COM_MOVE_RIGHT, threshold: 1 },
  { command: 'move up', keywords: ['move', 'up', 'move-up', 'Up', 'hope'], action: COM_MOVE_UP, threshold: 2 },
  { command: 'move down', keywords: ['move', 'down', 'gown', 'brown', 'dawn'], action: COM_MOVE_DOWN, threshold: 2 },
  { command: 'zoom in', keywords: ['zomm', 'in'], action: COM_ZOOM_IN, threshold: 2 },
  { command: 'zoom out', keywords: ['zoom', 'out'], action: COM_ZOOM_OUT, threshold: 2 },
  { command: 'stop', keywords: ['stop', 'wait', 'hold', 'ho', 'hoe', 'holdon'], action: COM_STOP, threshold: 1 },
  { command: 'help', keywords: ['help'], action: COM_HELP, threshold: 1 },
  { command: 'enhance', keywords: ['enhance', 'hands', 'hand', 'han', 'hun'], action: COM_ENHANCE, threshold: 1 },
  { command: 'center', keywords: ['center'], action: COM_CENTER, threshold: 1 },
  { command: 'shutdown', keywords: ['shut', 'down', 'shutdown', 'exit'], action: TOGGLE_POWER, threshold: 1 },
  { command: 'okay', keywords: ['okay', 'yes'], action: OKAY, threshold: 1 },
  { command: 'cancel', keywords: ['cancel', 'no', 'abort'], action: CANCEL, threshold: 1 }
]

window.SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
window.SpeechGrammarList = (window as any).webkitSpeechGrammarList || (window as any).SpeechGrammarList;

let recognition: SpeechRecognition|null = null

if ('SpeechRecognition' in window) {
    // speech recognition API supported
    recognition = new window.SpeechRecognition();

    const grammar = '#JSGF V1.0; grammar commands; public <sys> = shutdown | "shut down" | exit | help; public <move> = move | pan | track | scroll; public <zoom> = zoom | pull; public <stop> = stop | wait | "wait a minute" | hold | "hold on"; public <other.action> =  enhance | center; public <confirm> = okay | cancel | yes | no; public <direction> = up | down | left | right; public <command.move> = <move> <direction>; public <command.zoom> = <zoom> (in | out);'
    const speechRecognitionList = new window.SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;
    recognition.maxAlternatives = 10;
    try {
      recognition.continuous = true;
    } catch (e) {}

    recognition.onresult = function(event) { 
      store.dispatch(processCommand(event.results[event.resultIndex]))
    }

    recognition.onnomatch = function() { 
      store.dispatch(invalidCommand(null))
    }

    // recognition.onerror = function(event) {
    //   console.log('Speech recognition error detected: ' + event.error);
    //   store.dispatch(invalidCommand(null))
    // }

} else {
  // speech recognition API not supported
  throw 'Speech recognition API not supported 😶'
}

export default recognition

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
