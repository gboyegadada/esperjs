const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
const a = AudioContext ? new AudioContext() : null // browsers limit the number of concurrent audio contexts, so you better re-use'em

export default function beep(vol: number = 20, freq: number = 700, duration: number = 300){
  if (!a) {
    console.error('Unable to use AudioContext 😶')
    return
  }

  const v = a.createOscillator()
  const u = a.createGain()
  
  v.connect(u)
  v.frequency.value = freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value = vol * 0.01
  v.start(a.currentTime)
  v.stop(a.currentTime + duration * 0.001)
}

export const errorEfx: any[] = [20, 900, 300]
export const okayEfx: any[] = [20, 700, 300]

export function okayBeep(count: number = 1) {
    let i = 0
    let ref = setInterval(() => {
        i++
        beep.apply(okayEfx)
        if (i >= count) clearInterval(ref)
        
    }, 400)
}

export function errorBeep(count: number = 3) {
    let i = 0
    let ref = setInterval(() => {
        i++
        beep.apply(errorEfx)
        if (i >= count) clearInterval(ref)
        
    }, 400)
}