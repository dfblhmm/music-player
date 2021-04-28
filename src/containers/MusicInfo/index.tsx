import { ComponentType } from 'react'
import { connect } from 'react-redux'
const mapStateToProps = (state: GlobalState) => {
  const { url, freeTrialInfo, duration } = state.musicInfo
  return { url, freeTrialInfo, duration }
}
export type TypeOfState = {
  musicInfo: MusicSource
}
export default function MusicInfo(Component: ComponentType<any>) {
  return connect(mapStateToProps)(Component)
}