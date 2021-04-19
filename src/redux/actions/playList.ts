import { ADD, CLEAR } from '../constant'
export const addToList = (data: onPlayInfoType): Action<onPlayInfoType> => ({ type: ADD, data  })
export const clearList = (): Action<onPlayInfoType | null> => ({ type: CLEAR, data: null })