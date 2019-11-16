import React, { useRef, useEffect } from 'react'

import '../styles/grid.css'

interface Props {
  
}

export default function Grid ({  }: Props) {
  return (
    <div className='x-grid'>
      {new Array(60).fill(true).map((v, i) => (
        <div key={`x-grid-i${i}`} className='x-grid-item '></div>
      ))}
    </div>
    )
}