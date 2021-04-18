import { UPDATEPLAYINFO } from '../constant'
const initState: onPlayInfoType = {
  id: 0,
  src: '',
  duration: 0
}

export default function onPlayInfo(preState = initState, action: Action<onPlayInfoType>): onPlayInfoType {
  const { type, data } = action
  if (type !== UPDATEPLAYINFO) return preState
  return data
}