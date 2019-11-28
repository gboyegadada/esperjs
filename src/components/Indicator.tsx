import React, { Component } from 'react';
import { MdBrightness1 } from 'react-icons/md';
import { connect, useSelector } from 'react-redux';
import { ReceivedState, AppState } from '../types/state';

interface Props {
    successClassName: string
    dangerClassName: string
    sleepClassName?: string
}

export default function Indicator(props: Props) {
  const received = useSelector((state: AppState) => state.received)
  const { successClassName, dangerClassName, sleepClassName = 'led led-sleep' } = props 

  return (
      <MdBrightness1 className={`${ReceivedState.Success === received 
              ? successClassName 
              : ReceivedState.Failed === received ? dangerClassName : sleepClassName}`} />
      )
}
