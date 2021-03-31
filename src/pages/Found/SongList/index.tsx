import { PureComponent } from 'react'
import style from './index.module.scss'
export default class SongList extends PureComponent {
  render() {
    return (
      <div style={{padding: '0 90px'}}>
        <div className={style['top-high-quality']}></div>
      </div>
    )
  }
}
