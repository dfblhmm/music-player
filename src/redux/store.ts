import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import allReducers from './reducers'
export default createStore(allReducers, composeWithDevTools())