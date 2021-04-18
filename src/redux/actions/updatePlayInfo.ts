import { UPDATEPLAYINFO } from '../constant'
import http from '@utils/http'
const updatePlayInfoHandle = (data: onPlayInfoType): Action<onPlayInfoType> => {
  return { type: UPDATEPLAYINFO, data }
}
export const updatePlayInfo = (id: number) => {
  return async(dispatch: any) => {
    const res = await http('/song/url', { id })
    const detail = await http('/song/detail', { ids: id })
    const onPlayInfo: onPlayInfoType = {
      id, src: res.data[0].url, duration: Math.floor(detail.songs[0].dt / 1000)
    }
    dispatch(updatePlayInfoHandle(onPlayInfo))
  }
}