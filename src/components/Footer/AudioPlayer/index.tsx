import { PureComponent } from 'react'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface IState {
  playMode: number // 播放模式
  playStatus: boolean // 播放状态
}
interface IProps {

}
export default class AudioPlayer extends PureComponent<IProps, IState> {
  state: IState = {
    playMode: 0,
    playStatus: false
  }
  // 改变播放模式
  changePlayMode(mode: number): JSX.Element {
    // 模式0代表列表循环，1代表单曲循环，2代表随机播放，3代表顺序播放
    switch (mode % 4) {
      case 1:
        return this.Icon('icon-one-play', '单曲循环')
      case 2: 
        return this.Icon('icon-random-play', '随机播放')
      case 3:
        return this.Icon('icon-order-play', '顺序播放')
      default:
        return this.Icon('icon-list-play', '列表循环')
    }
  }
  // 播放模式Icon
  Icon(type: string, title: string): JSX.Element {
    return (
      <IconFont type={type} className={style.icon} title={title} 
        onClick={this.changeMode} />
    )
  }
  // 改变播放模式
  changeMode = () => {
    this.setState(state => ({ playMode: state.playMode + 1 }))
  }
  render() {
    const { playMode, playStatus } = this.state
    return (
      <div className={style['audio-container']}>
        <div className={style['play-control']}>
          {this.changePlayMode(playMode)}
          <IconFont type="icon-prev-song" className={style.icon} title="上一首" />
          <IconFont type={playStatus ? 'icon-pause' : 'icon-play'} 
            className={style['play-icon']} title={playStatus ? '暂停' : '播放'} />
          <IconFont type="icon-next-song" className={style.icon} title="下一首" />
        </div>
      </div>
    )
  }
}
