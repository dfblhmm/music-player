import { combineReducers } from 'redux'
import loginStatus from './loginStatus'
import onPlayInfo from './onPlayInfo'
import playList from './playList'
import musicInfo from './musicInfo'
export default combineReducers({
  loginStatus, onPlayInfo, playList, musicInfo
})