import { LINK } from 'redux/constant'
const initState = 'recommend'
export default function navLinkReducers(preState = initState, action: LinkAction) {
  const { type, data } = action
  switch (type) {
    case LINK:
      return data
    default:
      return preState
  }
}