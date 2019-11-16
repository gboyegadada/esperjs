import React, { useRef, useEffect } from 'react'

import '../styles/grid.css'

interface Props {
  on?: boolean
}

export default function Grid ({ on = true }: Props) {
  return (
    <div className={`x-grid ${on ? 'active' : ''}`}>
      {new Array(60).fill(true).map((v, i) => (
        <div key={`x-grid-i${i}`} className='x-grid-item '></div>
      ))}
    </div>
    )
}