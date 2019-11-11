import React, { Component } from 'react';
import { CommandsState } from '../types/state';
import { connect } from 'react-redux';

interface Props {
    commands: CommandsState
}

export function Console ({ commands }: Props) {
    return (
        <div>
          <code>
            <ul>
              {commands.map((com, k) => (
                <li key={k}>{com}</li>
              ))}
            </ul>
          </code>
        </div>
        )
}

export default connect(({ commands }: { commands: CommandsState }) => ({ commands }))(Console)