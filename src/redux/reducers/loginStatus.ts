import { LOGINSTATUS } from '../constant'
const initState = false
export default function login(preState = initState, action: Action<boolean>): boolean {
  const { type, data } = action
  if (type === LOGINSTATUS) return data
  return preState
}