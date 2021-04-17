import { PureComponent } from 'react'
import { Tooltip } from 'antd'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
const src = 'https://m701.music.126.net/20210417232317/91c81a6cc641b190f4b03f71e48aae42/jdyyaac/5558/5653/005a/b24d390feda9ed36089b70644163775d.m4a'
interface IState {
  playMode: number // 播放模式
  playStatus: boolean // 播放状态
}
interface IProps {

}
export default class AudioPlayer extends PureComponent<IProps, IState> {
  audio!: HTMLAudioElement | null
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
    const cssStyle = { 
      fontSize: '12px', overflow: 'hidden', borderRadius: '5px', 
      paddingLeft: '15px', paddingRight: '15px', letterSpacing: '.15em'
    }
    return (
      <Tooltip placement="top" title={title} visible={true} overlayInnerStyle={cssStyle}>
        <IconFont type={type} className={style.icon} title={title} 
          onClick={this.changeMode} />
      </Tooltip>
    )
  }
  // 改变播放模式
  changeMode = () => {
    this.setState(state => ({ playMode: state.playMode + 1 }))
  }
  // 播放控制
  playControl = () => {
    // 播放/暂停音乐
    const { playStatus } = this.state
    if (playStatus) this.audio?.pause()
    else this.audio?.play()
    this.setState({ playStatus: !playStatus })
  }
  render() {
    const { playMode, playStatus } = this.state
    return (
      <div className={style['audio-container']}>
        <audio src={src} ref={c => this.audio = c}></audio>
        <div className={style['play-control']}>
          {this.changePlayMode(playMode)}
          <IconFont type="icon-prev-song" className={style.icon} title="上一首" />
          <IconFont type={playStatus ? 'icon-pause' : 'icon-play'} onClick={this.playControl}
            className={style['play-icon']} title={playStatus ? '暂停' : '播放'} />
          <IconFont type="icon-next-song" className={style.icon} title="下一首" />
        </div>
      </div>
    )
  }
}
