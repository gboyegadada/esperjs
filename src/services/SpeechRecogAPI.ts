import SpeechRecognitionInterface from '../types/SpeechRecognitionInterface'
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
import { command } from '../utils/speechRecognition';

export const vocab: command[] = [
  { command: 'stop', keywords: ['stop', 'wait', 'hold', 'ho', 'hoe', 'holdon'], action: COM_STOP, threshold: 1 },
  { command: 'enhance', keywords: ['enhance', 'hands', 'hand', 'han', 'hun'], action: COM_ENHANCE, threshold: 1 },
  { command: 'move left', keywords: ['left', 'lift', 'trackleft', 'tracklist', 'panleft', 'penlist', 'panelist', 'palette', 'palate', 'padlet', 'pilot'], action: COM_MOVE_LEFT, threshold: 1 },
  { command: 'move right', keywords: ['right', 'rite', 'wright', 'write', 'trackrite', 'trackright', 'ride', 'penrite'], action: COM_MOVE_RIGHT, threshold: 1 },
  { command: 'move up', keywords: ['up', 'move-up', 'Up', 'hope'], action: COM_MOVE_UP, threshold: 1 },
  { command: 'move down', keywords: ['move', 'go', 'track', 'down', 'gown', 'brown', 'dawn'], action: COM_MOVE_DOWN, threshold: 2 },
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

export default class SpeechRecogAPI implements SpeechRecognitionInterface {

  subscribers: Function[] = []
  recognition: SpeechRecognition|null = null
  initialized = false
  lastStartedAt = 0 
  interimTimeoutHandle: NodeJS.Timeout | null = null
  running = false
  stopped = true
  away = false
  grammar = '#JSGF V1.0; grammar commands; ' + 
            'public <sys> = shutdown | "shut down" | exit | eject | close | help | upload | open | browse; ' + 
            'public <move> = move | pan | track | scroll | go; public <zoom> = zoom | pull; ' + 
            'public <stop> = stop | wait | "wait a minute" | hold | "hold on"; ' + 
            'public <other.action> =  enhance | center; ' + 
            'public <confirm> = okay | cancel | yes | no; ' + 
            'public <direction> = up | down | left | right | back; ' + 
            'public <command.move> = <move> <direction>; public <command.zoom> = <zoom> (in | out);'

  constructor() {
    this.__startNow = this.__startNow.bind(this)

    if (
      'SpeechRecognition' in window && 
      'SpeechGrammarList' in window && 
      window.SpeechRecognition &&
      window.SpeechGrammarList
      ) {
        // speech recognition API supported
        this.recognition = new window.SpeechRecognition();
    
        const speechRecognitionList = new window.SpeechGrammarList();
        speechRecognitionList.addFromString(this.grammar, 1);
    
        this.recognition.grammars = speechRecognitionList;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 4
    
        this.recognition.onresult = (event) => { 
    
          const result: SpeechRecognitionResult = event.results[event.resultIndex]
          this.subscribers.forEach((s) => {
            s(result)
          })
    
        }
    
        this.recognition.onnomatch = () => { 
          
        }
    
        this.recognition.onstart = () => { 
          console.log('Listening...')
          this.running = true
        }
    
        this.recognition.onend = () => { 
          this.running = false
          if (this.interimTimeoutHandle || this.stopped || this.away) return
    
          console.log('Restart listening...')
          this.startListening()
        }
    
        window.addEventListener('blur', () => {
          this.away = true
          console.log('Sleep...')
    
          if (this.initialized && this.recognition && this.running) this.recognition.stop()
        })
    
        window.addEventListener('focus', () => {
          this.away = false
          console.log('Wake...')
    
          if (this.initialized && this.recognition && !this.stopped) this.startListening()
        })
    
        this.recognition.onerror = function(event) {
          console.log('Speech recognition error detected: ' + event.error);
          
        }
    
        this.initialized = true
    
    } else {
      // speech recognition API not supported
      console.error('It looks like speech recognition API is not yet supported in your browser 😶')
    }
  }

  __startNow() {
    if (!this.initialized || !this.recognition || this.stopped || this.running) return
  
    this.recognition.start()
    this.running = true
    this.lastStartedAt = new Date().getTime()
  }

  subscribe(callable: Function) {
    this.subscribers.push(callable)

    return () => {
      this.subscribers = this.subscribers.filter((v) => v !== callable)
    }
  }

  startListening() {
    if (this.running) this.stopListening()
  
    if (!this.initialized || !this.recognition) return false
  
    this.stopped = false
  
    // play nicely with the browser, and never restart automatically more than once per second
    let timeSinceLastStart = new Date().getTime() - this.lastStartedAt
  
    if (timeSinceLastStart < 1000) this.interimTimeoutHandle = setTimeout(this.__startNow, 1000 - timeSinceLastStart)
    else this.__startNow()
  
    return true
  }

  stopListening() {
    if (this.initialized && this.recognition && this.running) {
      this.recognition.stop()
      console.log('Stopped listening...')
    }

    this.stopped = true
    if (this.interimTimeoutHandle) {
      clearInterval(this.interimTimeoutHandle)
      this.interimTimeoutHandle = null
    }
  }

}