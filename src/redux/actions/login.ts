import { LOGIN } from '../constant'
export const login = (data: boolean): Action<boolean> => ({ type: LOGIN, data })