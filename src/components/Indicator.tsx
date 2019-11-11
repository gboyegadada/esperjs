import React, { useState, Component } from 'react';
import { MdBrightness1 } from 'react-icons/md';
import { connect } from 'react-redux';
import { ReceivedState } from '../types/state';

interface Props {
    received: ReceivedState
    successClassName: string
    dangerClassName: string
    sleepClassName?: string
}

export class Indicator extends Component<Props> {

    render() {
        const { received, successClassName, dangerClassName, sleepClassName = 'led led-sleep' }: Props = this.props 

        return (
            <MdBrightness1 className={`${ReceivedState.Success === received 
                    ? successClassName 
                    : ReceivedState.Failed === received ? dangerClassName : sleepClassName}`} />
            )
    }
}

export default connect(({ received }: { received: ReceivedState }) => ({ received }))(Indicator)