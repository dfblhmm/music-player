import { MouseEventHandler, PureComponent } from 'react'
import { Image } from 'antd'
import { nanoid } from 'nanoid'
import './index.scss'
import IconFont from '@/components/IconFont'
interface PrevNext {
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
export default class Carousel extends PureComponent<BannersProps> {
  state = {
    activeIndex: 0,
    timer : 0
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
    // 组件挂载完成
    // 浏览器窗口处于活动状态
    window.addEventListener('focus', this.autoplay)
    // 浏览器窗口处于不活跃状态
    window.addEventListener('blur', this.pause)
  }
  componentWillUnmount() {
    // 组件销毁，关闭定时器，移除事件
    this.pause()
    window.removeEventListener('focus', this.autoplay)
    window.removeEventListener('blur', this.pause)
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
  handleClickImg = (index: number): MouseEventHandler => {
    const { prev, next } = this.getPrevAndNext()
    if (index === prev) return this.changeCurrent('prev')
    if (index === next) return this.changeCurrent('next')
    return () => console.log(index)
  }
  render() {
    const { activeIndex } = this.state
    const { banners, height, showArrow, showDot } = this.props
    return (
      <div className="carousel-container" style={{height: height + 'px'}} 
        onMouseEnter={this.pause} onMouseLeave={this.autoplay}> 
        <IconFont type="icon-arrow-left" className="carousel-arrow" title="上一张" 
          style={{display: showArrow ? 'block':'none'}} onClick={this.changeCurrent('prev')}/>
        {
          banners.map((value, index) => {
            const { titleColor, typeTitle } = value
            return (
              <div key={index} className={this.getCurrentClassName(index)} style={{height: height - 25 + 'px'}}
                 onClick={this.handleClickImg(index)}>
                <Image src={value.imageUrl} placeholder preview={false} />
                <span className="banner-title" 
                  style={{backgroundColor: titleColor==='red' ? '#CC4A4A' : '#4A79CC'}}>{typeTitle}
                </span>
              </div>
            )
          })
        }
        <IconFont type="icon-arrow-right" className="carousel-arrow" title="下一张" 
          style={{display: showArrow ? 'block':'none'}} onClick={this.changeCurrent('next')}/>
        {/* 小圆点 */}
        <ul className="carousel-dot" style={{height: '25px', display: showDot ? 'flex':'none'}} >
          {
            banners.map((value, index) => 
              <li key={nanoid()} onMouseOver={() =>this.setState({activeIndex: index})}>
                <span className={activeIndex === index ? 'carousel-active-dot': ''}></span>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
