import { GET_MUSIC, RESET_MUSIC } from '../constant'
import { updatePlayInfo } from './onPlayInfo'
import http from '@utils/http'
export const updateMusic = (data: MusicSource): Action<MusicSource> => ({ type: GET_MUSIC, data })
export const resetMusic = (): Action<null> => ({ type: RESET_MUSIC, data: null })
interface urlDetail {
  url: string,
  freeTrialInfo?: { start: number, end: number }
}
export const getMusic = (id: number) => {
  return async(dispatch: any) => {
    const res = await http('/song/url', { id })
    const detail = res.data[0] as urlDetail
    const { url, freeTrialInfo } = detail
    // 更新当前歌曲资源
    dispatch(updateMusic({ url, freeTrialInfo, id }))
    // 更新当前歌曲专辑图等其他信息
    dispatch(updatePlayInfo(id))
  }
}