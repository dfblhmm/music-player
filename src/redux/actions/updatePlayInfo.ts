import { UPDATEPLAYINFO } from '../constant'
import { addToList } from './playList'
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
    // 更新当前播放歌曲信息
    dispatch(updatePlayInfoHandle(onPlayInfo))
    // 将当前歌曲添加到播放列表
    dispatch(addToList(onPlayInfo))
  }
}