import { LOGINSTATUS } from '../constant'
export const loginStatus = (data: boolean): Action<boolean> => ({ type: LOGINSTATUS, data })