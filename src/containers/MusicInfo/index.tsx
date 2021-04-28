import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { getMusic } from '@redux/actions/updateMusic'
const mapStateToProps = (state: GlobalState) => {
  const { musicInfo, playList } = state
  const { url, freeTrialInfo, id } = musicInfo
  return { url, freeTrialInfo, id, playList }
}
const mapDispatchToProps = { getMusic }
type TypeOfState = MusicSource & { playList: Array<PlayListType> }
type TypeOfDispatch = typeof mapDispatchToProps
export default function MusicInfo<T>(Component: ComponentType<any>) {
  return connect<TypeOfState,TypeOfDispatch,T,any>(mapStateToProps, mapDispatchToProps)(Component)
}