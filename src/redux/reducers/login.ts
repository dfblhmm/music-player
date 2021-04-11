import { LOGIN } from '../constant'
const initState = false
export default function login(preState = initState, action: Action<boolean>): boolean {
  const { type, data } = action
  if (type === LOGIN) return data
  return preState
}