import { PureComponent } from 'react'
import { Tooltip, Slider } from 'antd'
import IconFont from '@components/IconFont'
import formatTime from '@utils/formatTime'
import style from './index.module.scss'
const src = 'https://m701.music.126.net/20210417232317/91c81a6cc641b190f4b03f71e48aae42/jdyyaac/5558/5653/005a/b24d390feda9ed36089b70644163775d.m4a'
interface IState {
  playMode: number // 播放模式
  playStatus: boolean // 播放状态
  visible: boolean // 是否显示切换播放模式时的文字提示
  currentTime: number // 当前的歌曲时间
  isDrag: boolean // 是否正在拖拽滑块
}
interface IProps {
  // 正在播放歌曲的信息
  // onPlayInfo: {
  //   id: number, // 歌曲id
  //   url: string // 歌曲链接
  //   duration: number // 歌曲时长
  // }
}
export default class AudioPlayer extends PureComponent<IProps, IState> {
  audio!: HTMLAudioElement | null
  state: IState = {
    playMode: 0,
    playStatus: false,
    visible: false,
    currentTime: 0,
    isDrag: false
  }
  componentDidMount() {
    this.audio!.volume = 0.4 
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
    const { visible } = this.state
    const cssStyle = { 
      fontSize: '12px', overflow: 'hidden', borderRadius: '5px', 
      paddingLeft: '15px', paddingRight: '15px', letterSpacing: '.15em'
    }
    return (
      <Tooltip placement="top" title={title} visible={visible} overlayInnerStyle={cssStyle}>
        <IconFont type={type} className={style.icon} title={title} 
          onClick={this.changeMode} />
      </Tooltip>
    )
  }
  // 改变播放模式
  changeMode = () => {
    this.setState(state => ({ playMode: state.playMode + 1, visible: true }))
    window.setTimeout(() => this.setState({ visible: false }), 1000)
  }
  // 播放控制
  playControl = () => {
    // 播放/暂停音乐
    const { playStatus } = this.state
    if (playStatus) this.audio?.pause()
    else this.audio?.play()
    this.setState({ playStatus: !playStatus })
  }
  // 更新歌曲时间
  updateTime = () => {
    if (this.state.isDrag) return
    const currentTime = this.audio!.currentTime
    this.setState({ currentTime: Math.floor(currentTime) })
  }
  // 通过滑块改变歌曲的当前时间
  changeTime = (currentTime: number) => {
    this.setState({ currentTime, isDrag: true })
  }
  // 放开滑块后，更新当前歌曲播放进度
  afterChange = (currentTime: number) => {
    this.audio!.currentTime = currentTime
    this.setState({ currentTime, isDrag: false })
  }
  // 播放完毕
  end = () => {
    this.setState({ playStatus: false })
  }
  render() {
    const { playMode, playStatus, currentTime } = this.state
    const { updateTime, playControl, changeTime } = this
    return (
      <div className={style['audio-container']}>
        <audio src={src} ref={c => this.audio = c} onTimeUpdate={updateTime}
          onEnded={this.end}></audio>
        <div className={style['play-control']}>
          {this.changePlayMode(playMode)}
          <IconFont type="icon-prev-song" className={style.icon} title="上一首" />
          <IconFont type={playStatus ? 'icon-pause' : 'icon-play'} onClick={playControl}
            className={style['play-icon']} title={playStatus ? '暂停' : '播放'} />
          <IconFont type="icon-next-song" className={style.icon} title="下一首" />
        </div>
        <div className={style['progress-bar']}>
          <span>{formatTime(currentTime)}</span>
          <Slider tooltipVisible={false} max={271} min={0} value={currentTime}
            onChange={(value: number) => changeTime(value)} 
            onAfterChange={(value: number) => this.afterChange(value)} />
          <span>{formatTime(271)}</span>
        </div>
      </div>
    )
  }
}
