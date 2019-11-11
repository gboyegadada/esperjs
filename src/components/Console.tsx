import React, { Component } from 'react';
import { CommandState } from '../types/state';
import { connect } from 'react-redux';

interface Props {
    commands: CommandState[]
}

export function Console ({ commands }: Props) {
    return (
        <div>
          <code>
            <ul>
              {commands.map((com, k) => (
                <li key={k}>{com.command}</li>
              ))}
            </ul>
          </code>
        </div>
        )
}

export default connect(({ commands }: { commands: CommandState[] }) => ({ commands }))(Console)