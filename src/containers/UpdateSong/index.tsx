import { ComponentType } from 'react';
import { connect } from 'react-redux'
import { updatePlayInfo } from '@/redux/actions/updatePlayInfo'
export default function updateSong(Component: ComponentType<any>) {
  return connect(null, { updatePlayInfo })(Component)
}