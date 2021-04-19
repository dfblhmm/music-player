import { combineReducers } from 'redux'
import loginInfo from './loginInfo'
import onPlayInfo from './onPlayInfo'
import playList from './playList'
export default combineReducers({
  loginInfo, onPlayInfo, playList
})