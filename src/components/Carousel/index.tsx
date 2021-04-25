import { MouseEventHandler, PureComponent } from 'react'
import { Image } from 'antd'
import { nanoid } from 'nanoid'
import updateSong from '@containers/UpdateSong'
import './index.scss'
import IconFont from '@components/IconFont'
type PrevNext = {
  prev: number
  next: number
}
interface BannersProps {
  banners: Array<Banners>
  toggleTime: number
  height: number
  autoplay: boolean
  showArrow: boolean
  showDot: boolean
}
interface IProps extends BannersProps, PlaySongFunc {
}
interface IState {
  activeIndex: number
}
class Carousel extends PureComponent<IProps, IState> {
  timer?: number 
  state: IState = {
    activeIndex: 0
  }
  static defaultProps: BannersProps = {
    banners: [],
    toggleTime: 5000,
    height: 225,
    autoplay: true,
    showArrow: true,
    showDot: true
  }
  componentDidMount() {
    // 页面显示
    document.addEventListener('visibilitychange', this.controlCarousel)
    this.autoplay()
  }
  // 页面显示/隐藏时开启/关闭轮播
  controlCarousel = () => {
    const visibilityState = document.visibilityState
    if (visibilityState === 'visible') this.autoplay()
    else this.pause()
  }
  componentWillUnmount() {
    // 组件销毁，关闭定时器，移除事件
    this.pause()
    document.removeEventListener('visibilitychange', this.controlCarousel)
  }
  // 开启轮播
  autoplay = () => {
    const { autoplay, toggleTime } = this.props
    // 组件挂载完成，开启轮播
    if (!autoplay) return
    this.timer = window.setInterval(this.changeCurrent('next'), toggleTime)
  }
  // 停止轮播
  pause = () => {
    window.clearInterval(this.timer)
  }
  // 获取当前轮播图的前后项 
  getPrevAndNext = (): PrevNext => {
    const { activeIndex } = this.state
    const { banners } = this.props
    const prev = activeIndex ? activeIndex - 1 : banners.length - 1 
    const next = activeIndex === banners.length - 1 ? 0 : activeIndex + 1
    return { prev, next }
  }
  // 更换当前的轮播图
  changeCurrent = (direction: 'prev' | 'next'): MouseEventHandler => {
    return () => {
      const { prev, next } = this.getPrevAndNext()
      direction === 'prev' && this.setState({ activeIndex: prev })
      direction === 'next' && this.setState({ activeIndex: next })
    }
  }
  // 获取当前的类名
  getCurrentClassName = (index: number): string => {
    const { prev, next } = this.getPrevAndNext()
    const { activeIndex } = this.state
    switch (index) {
      case prev:
        return 'carousel-item carousel-prev'
      case next: 
        return 'carousel-item carousel-next'
      case activeIndex:
        return 'carousel-item carousel-active'
      default:
        return 'carousel-item'
    }
  }
  // 点击了轮播图
  handleClickImg = (index: number, value: Banners): MouseEventHandler => {
    const { prev, next } = this.getPrevAndNext()
    if (index === prev) return this.changeCurrent('prev')
    if (index === next) return this.changeCurrent('next')
    return () => {
      const { targetId, targetType, url } = value
      if (targetId && targetType === 1) return this.props.updatePlayInfo(targetId) 
      url && window.open(url)
    }
  }
  render() {
    const { activeIndex } = this.state
    const { banners, height, showArrow, showDot } = this.props
    return (
      <div className="carousel-container" style={{ height }} 
        onMouseEnter={this.pause} onMouseLeave={this.autoplay}> 
        <IconFont type="icon-arrow-left" className="carousel-arrow" title="上一张" 
          style={{display: showArrow ? 'block':'none'}} onClick={this.changeCurrent('prev')}/>
        {
          banners.map((value, index) => {
            const { titleColor, typeTitle } = value
            return (
              <div key={index} className={this.getCurrentClassName(index)} style={{ height: height - 25 }}
                 onClick={this.handleClickImg(index, value)}>
                <Image src={value.imageUrl} placeholder preview={false} />
                <span className="banner-title" 
                  style={{backgroundColor: titleColor==='red' ? '#CC4A4A' : '#4A79CC'}}>{typeTitle}
                </span>
              </div>
            )
          })
        }
        <IconFont type="icon-arrow-right" className="carousel-arrow" title="下一张" 
          style={{display: showArrow ? 'block' : 'none'}} onClick={this.changeCurrent('next')}/>
        {/* 小圆点 */}
        <ul className="carousel-dot" style={{height: '25px', display: showDot ? 'flex':'none'}} >
          {
            banners.map((value, index) => 
              <li key={nanoid()} onMouseOver={() => this.setState({activeIndex: index})}>
                <span className={activeIndex === index ? 'carousel-active-dot': ''}></span>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default updateSong(Carousel)
