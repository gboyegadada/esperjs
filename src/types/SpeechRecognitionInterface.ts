export default interface SpeechRecognition {
  initialized: boolean

  startListening: () => boolean
  stopListening: () => void
  subscribe: (callable: Function) => (result: any) => void
}