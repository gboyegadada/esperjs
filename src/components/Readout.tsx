import React from 'react'

import '../styles/readout.css'

interface Props {
  zm: number
  ns: number
  ew: number
}

export default function Readout ({ zm, ns, ew }: Props) {
  return (
    <div className={`x-readout d-flex w-50 p-2 justify-content-between flex-no-wrap flex-row`}>
      <code>ZM {`${zm < 0 ? '-' : ''}` + `${Math.abs(zm)}`.padStart(4, '0')}</code>
      <code>NS {`${ns < 0 ? '-' : ''}` + `${Math.abs(ns)}`.padStart(4, '0')}</code>
      <code>EW {`${ew > 0 ? '-' : ''}` + `${Math.abs(ew)}`.padStart(4, '0')}</code>
    </div>
    )
}