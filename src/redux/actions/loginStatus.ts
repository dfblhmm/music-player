import { LOGINSTATUS } from '../constant'
export const changeLogin = (data: LoginType): Action<LoginType> => ({ type: LOGINSTATUS, data })