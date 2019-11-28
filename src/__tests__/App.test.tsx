import React from 'react';
import {mount, shallow} from 'enzyme'
import configureMockStore from 'redux-mock-store'
import App from '../components/App';
import { UploaderStatus } from '../types/state'
import { Provider } from 'react-redux'

const mockStore = configureMockStore([]);

it('renders without crashing', () => {
  
  const store = mockStore({
    power: { on: false },
    uploader: {
      status: UploaderStatus.Ready,
      file: null,
    }
  });

  shallow(
    <Provider store={store}>
      <App />
    </Provider>)
})