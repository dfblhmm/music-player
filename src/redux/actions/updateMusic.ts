import { GET_MUSIC, RESET_MUSIC } from '../constant'
export const updateMusic = (data: MusicSource): Action<MusicSource> => ({ type: GET_MUSIC, data })
export const resetMusic = (): Action<MusicSource | null> => ({ type: RESET_MUSIC, data: null })