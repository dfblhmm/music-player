import { GET_MUSIC, RESET_MUSIC } from '../constant'
const initState: MusicSource = {
  id: 0,
  url: '',
}
export default function reducer(preState = initState , action: Action<MusicSource>) {
  const { type, data } = action
  switch (type) {
    case GET_MUSIC:
      return data
    case RESET_MUSIC:
      return initState
    default:
      return preState
  }
}