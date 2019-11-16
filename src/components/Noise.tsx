import React, { useRef, useEffect } from 'react'
import createLoop from '../utils/noiseEfx'

import '../styles/canvas.css'

export default function Noise () {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // closer to analouge appearance
    canvas.width = canvas.height = 256
    createLoop(context)()    
  })

  

  return (
    <canvas className='noise' ref={canvasRef} ></canvas>
    )
}