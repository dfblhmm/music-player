import { UPDATEPLAYINFO } from '../constant'
import store from '../store'
import { addToList } from './playList'
import http from '@utils/http'
const updatePlayInfoHandle = (data: onPlayInfoType): Action<onPlayInfoType> => {
  return { type: UPDATEPLAYINFO, data }
}
const getSong = (id: number): onPlayInfoType | null => {
  const { playList } = store.getState()
  let index = playList.findIndex(value => value.id === id)
  if (index === -1) return null
  return playList[index].songInfo
}

export const updatePlayInfo = (id: number, song?: onPlayInfoType) => {
  return async(dispatch: any) => {
    if (song) return dispatch(updatePlayInfoHandle(song)) 
    const info = id && getSong(id)
    if (info) return dispatch(updatePlayInfoHandle(info))
    const res = await http.all([
      { url: '/song/url', data: { id } },
      { url: '/song/detail', data: { ids: id }  }
    ])
    const src = res[0].data[0].url
    const duration = Math.floor(res[1].songs[0].dt / 1000)
    const songInfo: onPlayInfoType = { src, duration, id }
    // 更新当前播放歌曲信息
    dispatch(updatePlayInfoHandle(songInfo))
    // 将当前歌曲添加到播放列表
    dispatch(addToList({ id, songInfo }))
  }
}