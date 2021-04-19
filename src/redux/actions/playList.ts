import { ADD, CLEAR } from '../constant'
export const addToList = (data: PlayListType): Action<PlayListType> => ({ type: ADD, data })
export const clearList = (): Action<onPlayInfoType | null> => ({ type: CLEAR, data: null })