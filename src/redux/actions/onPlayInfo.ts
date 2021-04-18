import { UPDATEPLAYINFO } from '../constant'
export const updatePlayInfo = 
  (data: onPlayInfoType): Action<onPlayInfoType> => 
  ({ type: UPDATEPLAYINFO, data }) 