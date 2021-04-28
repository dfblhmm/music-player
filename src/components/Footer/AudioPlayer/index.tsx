import { PureComponent } from 'react'
import { Tooltip, Slider, message } from 'antd'
import musicInfo from '@containers/MusicInfo'
import IconFont from '@components/IconFont'
import formatTime from '@utils/formatTime'
import style from './index.module.scss'
interface IState {
  playMode: number // 播放模式
  playStatus: boolean // 播放状态
  visible: boolean // 是否显示切换播放模式时的文字提示
  currentTime: number // 当前的歌曲时间
  isDrag: boolean // 是否正在拖拽滑块
}
interface IProps extends PlaySongFunc, MusicSource {
  id: number
  playList: PlayListType[]
  isVip: boolean
  cs: boolean
}
class AudioPlayer extends PureComponent<IProps, IState> {
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
  componentDidUpdate(prevProps: IProps) {
    const preSrc = prevProps.url
    const src = this.props.url
    if (preSrc === src) return
    const { isVip, freeTrialInfo, cs } = this.props
    if (isVip && !freeTrialInfo && !cs) return message.error('该歌曲为付费歌曲~~~')
    this.audio?.play()
    this.updateTime()
    this.setState({ playStatus: true, currentTime: 0 })
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
    const { freeTrialInfo } = this.props
    freeTrialInfo && this.setState({ currentTime: freeTrialInfo.start + currentTime })
    !freeTrialInfo && this.setState({ currentTime })
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
    const playMode = this.state.playMode % 4
    const index = this.getCurrentIndex()
    const { playList } = this.props
    if (playMode === 3 && index === playList.length - 1) return this.setState({ playStatus: false })
    if (playMode === 1 || playList.length === 1) {
      this.audio?.play()
      this.setState({ playStatus: true })
      return
    }
    this.next()
  }
  // 切换歌曲
  toggleSong(toggle: 'next' | 'prev') {
    const { playMode } = this.state
    const { playList, updatePlayInfo } = this.props
    const length = playList.length
    if (length <= 1) return
    // 非随机播放模式
    if (playMode % 4 !== 2) {
      let index = this.getCurrentIndex()
      if (toggle === 'prev') index = index === 0 ? playList.length - 1 : index - 1
      else index = index === length - 1 ? 0 : index + 1
      updatePlayInfo(0, playList[index].songInfo)
    } else {
      // 随机播放模式
      while(true) {
        const index = Math.floor(Math.random() * length)
        updatePlayInfo(0, playList[index].songInfo)
        break
      }
    }
  }
  // 上一首
  prev = () => {
    this.toggleSong('prev')
  }
  // 下一首
  next = () => {
    this.toggleSong('next')
  }
  // 获取当前歌曲在播放列表中的索引
  getCurrentIndex(): number {
    const { playList, id } = this.props
    return playList.findIndex(value => value.id === id)
  }
  // 视听片段
  getFreeTrialInfo = () => {
    const { freeTrialInfo } = this.props
    if (freeTrialInfo) {
      const { start, end } = freeTrialInfo
      return { [start]: '', [end]: '' }
    }
    return undefined
  }
  render() {
    const { playMode, playStatus, currentTime } = this.state
    const { updateTime, playControl, changeTime, afterChange, prev, next, getFreeTrialInfo } = this
    const { url, duration } = this.props
    return (
      <div className={style['audio-container']}>
        <audio src={url} ref={c => this.audio = c} onTimeUpdate={updateTime}
          onEnded={this.end} preload="auto"></audio>
        <div className={style['play-control']}>
          {this.changePlayMode(playMode)}
          <IconFont type="icon-prev-song" className={style.icon} title="上一首" onClick={prev} />
          <IconFont type={playStatus ? 'icon-pause' : 'icon-play'} onClick={playControl}
            className={style['play-icon']} title={playStatus ? '暂停' : '播放'} />
          <IconFont type="icon-next-song" className={style.icon} title="下一首" onClick={next} />
        </div>
        <div className={style['progress-bar']}>
          <span>{formatTime(currentTime)}</span>
          <Slider tooltipVisible={false} max={duration} min={0} value={currentTime}
            onChange={(value: number) => changeTime(value)} marks={getFreeTrialInfo()}
            onAfterChange={(value: number) => afterChange(value)} />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    )
  }
}

export default musicInfo(AudioPlayer)