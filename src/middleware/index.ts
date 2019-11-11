import { applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'

import logger from './logger'

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware()

export default applyMiddleware(sagaMiddleware, logger)