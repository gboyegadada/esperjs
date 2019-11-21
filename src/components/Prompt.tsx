import React from 'react';
import { ConfirmState } from '../types/state';
import { connect } from 'react-redux';

interface Props {
    confirm: ConfirmState
}

export function Prompt ({ confirm }: Props) {
    return (
        <>
        { false && null !== confirm &&
            <div className='prompt p2 w-100'>
                <code>{confirm.message}</code>
            </div> 
        }
        </>
    )
}

export default connect(({ confirm }: { confirm: ConfirmState }) => ({ confirm }))(Prompt)