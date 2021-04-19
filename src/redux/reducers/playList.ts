import { ADD, CLEAR } from '../constant'
const initState = new Array<onPlayInfoType>()
export default function playList(preState = initState, action: Action<onPlayInfoType>) {
  const { type, data } = action
  switch (type) {
    case ADD:
      return [...preState, data]
    case CLEAR: 
      return []
    default:
      return preState
  }
}