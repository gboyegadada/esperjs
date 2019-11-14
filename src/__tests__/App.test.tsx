import React from 'react';
import {mount, shallow} from 'enzyme'
import { App } from '../components/App';

it('renders without crashing', () => {
  shallow(<App power={ {on: false } } dispatch={ () => null }/>);
});