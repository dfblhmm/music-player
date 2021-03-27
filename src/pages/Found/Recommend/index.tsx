import { PureComponent } from 'react'
import http from 'utils/http'
import style from './index.module.scss'
import Carousel from 'components/Carousel'
interface Banners {
  imageUrl: string,
  targetId: number,
  [key: string]: any
}
export default class Recommend extends PureComponent {
  state = {
    banners: []
  }
  async componentDidMount() {
    const res = await http('/banner')
    const banners: Array<Banners> = []
    res.banners.forEach((value: Banners) => {
      banners.push({ imageUrl: value.imageUrl + '?param=566y200', targetId: value.targetId })
    })
    this.setState({banners})
  }
  
  render() {
    const { banners } = this.state
    return (
      <div className={style.container}>
        <Carousel banners={banners} autoplay={false} />
      </div>
    )
  }
}
