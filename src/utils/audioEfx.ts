const a = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

export default function beep(vol: number = 40, freq: number = 700, duration: number = 300){
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

export const errorEfx: any[] = [35, 900, 300]
export const okayEfx: any[] = [35, 700, 300]

export function errorBeep(count: number = 3) {
    let i = 0
    let ref = setInterval(() => {
        i++
        beep.apply(errorEfx)
        if (i >= count) clearInterval(ref)
        
    }, 400)
}