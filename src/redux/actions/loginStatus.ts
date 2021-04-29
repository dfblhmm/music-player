import { LOGIN, LOGIN_OUT } from '../constant'
export const login = (data: LoginType): Action<LoginType> => ({ type: LOGIN, data })
export const loginOut = (): Action<null> => ({ type: LOGIN_OUT, data: null })