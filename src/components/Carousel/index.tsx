import { MouseEventHandler, PureComponent } from 'react'
import { Image } from 'antd'
import './index.scss'
import IconFont from 'components/IconFont'
import Img from 'assets/example.jpg'
export default class index extends PureComponent {
  state ={
    currentIndex: 0
  }
  // 更换当前的图片
  changeCurrent = (direction: string): MouseEventHandler => {
    const { currentIndex } = this.state
    return (e) => {
      console.log(currentIndex % 3)
      switch (direction) {
        case 'prev':
          if (currentIndex === 0) this.setState({currentIndex: 8})
          else this.setState({currentIndex: currentIndex - 1})
          break;
        case 'next':
          if (currentIndex === 8) this.setState({currentIndex: 0})
          else this.setState({currentIndex: currentIndex + 1})
          break;
        default:
          break;
      }

    }
  }
  render() {
    const { currentIndex } = this.state
    return (
      <div className="carousel-container">
        <IconFont type="icon-arrow-left" className="arrow" title="上一张" onClick={this.changeCurrent('prev')}/>
        <div className="carousel-item prev">
          <Image src={Img} height={200} placeholder />
        </div>
        <div className="carousel-item active"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item"><Image src={Img} height={200} placeholder /></div>
        <div className="carousel-item next"><Image src={Img} height={200} placeholder /></div>
        <IconFont type="icon-arrow-right" className="arrow" title="下一张" onClick={this.changeCurrent('next')}/>
      </div>
    )
  }
}
