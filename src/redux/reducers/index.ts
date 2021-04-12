import { combineReducers } from 'redux'
import loginStatus from './loginStatus'
export default combineReducers({
  loginInfo: loginStatus
})