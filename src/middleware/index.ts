import { applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import confirmChecker from '../middleware/confirmChecker'

import logger from './logger'

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware()

export default applyMiddleware(logger, confirmChecker, sagaMiddleware)