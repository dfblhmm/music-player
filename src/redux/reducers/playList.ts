import { ADD, CLEAR } from '../constant'
const initState = new Array<PlayListType>()
export default function playList(preState = initState, action: Action<PlayListType>): (typeof initState) {
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