import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import SpeechRecognitionInterface from '../types/SpeechRecognitionInterface'
import { command } from '../utils/speechRecognition';

import { 
  COM_STOP,
  COM_HELP,
  COM_ENHANCE,
  CANCEL,
  OKAY,
  COM_BACK,
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

export const vocab: command[] = [
  { command: 'stop', keywords: ['stop', 'wait', 'hold', 'ho', 'hoe', 'holdon'], action: COM_STOP, threshold: 1 },
  { command: 'enhance', keywords: ['enhance', 'hands', 'hand', 'han', 'hun'], action: COM_ENHANCE, threshold: 1 },
  { command: 'move left', keywords: ['left'], action: COM_MOVE_LEFT, threshold: 1 },
  { command: 'move right', keywords: ['right'], action: COM_MOVE_RIGHT, threshold: 1 },
  { command: 'move up', keywords: ['up'], action: COM_MOVE_UP, threshold: 1 },
  { command: 'move down', keywords: ['down'], action: COM_MOVE_DOWN, threshold: 1 },
  { command: 'zoom out', keywords: ['out'], action: COM_ZOOM_OUT, threshold: 1 },
  { command: 'zoom in', keywords: ['in'], action: COM_ZOOM_IN, threshold: 1 },
  { command: 'go back', keywords: ['go', 'back', 'pull', 'pool'], action: COM_BACK, threshold: 1 },
  { command: 'help', keywords: ['help'], action: COM_HELP, threshold: 1 },
  { command: 'center', keywords: ['center', 'centre', 'sent', 'Santa', 'Centre', 'centor', 'centa'], action: COM_CENTER, threshold: 1 },
  { command: 'shutdown', keywords: ['shut', 'shutdown', 'exit'], action: TOGGLE_POWER, threshold: 1 },
  { command: 'okay', keywords: ['okay', 'yes', 'yup', 'yep', 'roger', 'yeah', 'year', 'confirm', 'conform', 'affirmative', 'confirmed'], action: OKAY, threshold: 1 },
  { command: 'cancel', keywords: ['cancel', 'counsel', 'council', 'no', 'nope', 'abort'], action: CANCEL, threshold: 1 },
  { command: 'upload', keywords: ['upload', 'browse', 'open'], action: COM_UPLOADER_BROWSE, threshold: 1 },
  { command: 'eject', keywords: ['eject', 'close'], action: COM_UPLOADER_CLEAR, threshold: 1 }
]

export default class SpeechRecogTF implements SpeechRecognitionInterface {

  subscribers: Function[] = []
  recognizer: any // speechCommands.SpeechCommandRecognizer

  labels: string[]
  running = false
  stopped = true
  away = false
  initialized = false

  constructor() {
    this.recognizer = speechCommands.create('BROWSER_FFT')
    this.recognizer
      .ensureModelLoaded()
      .then(() => {
        this.labels = this.recognizer.wordLabels()
        this.initialized = true

        console.log(this.labels)
      })
      
    
    window.addEventListener('blur', () => {
      this.away = true
      console.log('Sleep...')

      if (this.initialized && this.recognizer && this.running) this.recognizer.stopListening()
    })

    window.addEventListener('focus', () => {
      this.away = false
      console.log('Wake...')

      if (this.initialized && this.recognizer && !this.stopped) this.startListening()
    })
  }

  subscribe(callable: Function) {
    this.subscribers.push(callable)

    return () => {
      this.subscribers = this.subscribers.filter((v) => v !== callable)
    }
  }

  startListening() {
    this.recognizer.listen((result: speechCommands.SpeechCommandRecognizerResult) => {
      // - result.scores contains the probability scores that correspond to
      //   recognizer.wordLabels().
      // - result.spectrogram contains the spectrogram of the recognized word.
      console.group('RECOG')
      
      let parsed = [...result.scores].map((v: number | Float32Array, i) => ({
          confidence: Number(v),
          transcript: this.labels[i],
      }))

      parsed = parsed.sort((a, b) => b.confidence - a.confidence).slice(0,3)

      this.subscribers.forEach(s => s(parsed))
      
      console.log('Result:', {result, parsed})
    }, {
      probabilityThreshold: 0.75,
      includeSpectrogram: false,
      invokeCallbackOnNoiseAndUnknown: false,
    })

    this.stopped = false
    this.running = true

    return true
  }

  stopListening() {
    this.recognizer.stopListening()
    this.stopped = true
    this.running = false
  }

}