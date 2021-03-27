import { MouseEventHandler, PureComponent } from 'react'
import { Image } from 'antd'
import './index.scss'
import IconFont from 'components/IconFont'
interface PrevNext {
  prev: number
  next: number
}
interface Banners {
  imageUrl: string
  targetId: number
}
interface Props {
  banners: Array<Banners>
  toggleTime: number
  height: number
  autoplay: boolean
}
export default class Carousel extends PureComponent<Props> {
  state = {
    activeIndex: 0,
    timer : 0
  }
  static defaultProps: Props = {
    banners: [],
    toggleTime: 5000,
    height: 200,
    autoplay: true
  }
  componentDidMount() {
    // 组件挂载完成，开启轮播
    this.autoplay()
  }
  componentWillUnmount() {
    // 组件销毁，关闭定时器
    this.pause()
  }
  // 开启轮播
  autoplay = () => {
    // 组件挂载完成，开启轮播
    if (!this.props.autoplay) return
    const { toggleTime } = this.props
    const timer = window.setInterval(this.changeCurrent('next'), toggleTime)
    this.setState({ timer })
  }
  // 停止轮播
  pause = () => {
    window.clearInterval(this.state.timer)
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
  changeCurrent = (direction: string): MouseEventHandler => {
    return () => {
      const { prev, next } = this.getPrevAndNext()
      if (direction === 'prev') {
        this.setState({ activeIndex: prev })
      } else {
        this.setState({ activeIndex: next })
      }
    }
  }
  // 获取当前的类名
  getCurrentClassName = (index: number): string => {
    const { prev, next } = this.getPrevAndNext()
    const { activeIndex } = this.state
    switch (index) {
      case prev:
        return 'carousel-item prev'
      case next: 
        return 'carousel-item next'
      case activeIndex:
        return 'carousel-item active'
      default:
        return 'carousel-item'
    }
  }
  // 点击了轮播图
  handleClickImg = (index: number): MouseEventHandler => {
    const { prev, next } = this.getPrevAndNext()
    if (index === prev) return this.changeCurrent('prev')
    if (index === next) return this.changeCurrent('next')
    return () => console.log(index)
  }
  render() {
    const { activeIndex } = this.state
    const { banners, height } = this.props
    return (
      <div className="carousel-container" style={{height: height + 'px'}}>
        <IconFont type="icon-arrow-left" className="arrow" title="上一张" onClick={this.changeCurrent('prev')}/>
        {
          banners.map((value, index) => {
            return (
              <div key={index} className={this.getCurrentClassName(index)} 
                onMouseEnter={this.pause} onMouseLeave={this.autoplay} onClick={this.handleClickImg(index)}
                >
                <Image src={value.imageUrl} height={height} placeholder preview={index===activeIndex} />
              </div>
            )
          })
        }
        <IconFont type="icon-arrow-right" className="arrow" title="下一张" onClick={this.changeCurrent('next')}/>
      </div>
    )
  }
}
