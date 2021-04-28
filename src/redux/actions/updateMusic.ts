import { GET_MUSIC, RESET_MUSIC } from '../constant'
import http from '@utils/http'
export const updateMusic = (data: MusicSource): Action<MusicSource> => ({ type: GET_MUSIC, data })
export const resetMusic = (): Action<MusicSource | null> => ({ type: RESET_MUSIC, data: null })
interface urlDetail {
  url: string,
  freeTrialInfo?: { start: number, end: number }
}
export const getMusic = (id: number) => {
  return async(dispatch: any) => {
    const res = await http('/song/url', { id })
    const detail = res.data[0] as urlDetail
    const { url, freeTrialInfo } = detail
    dispatch(updateMusic({ url, freeTrialInfo, id }))
  }
}