import { PureComponent, Fragment, MouseEventHandler } from 'react'
import style from './index.module.scss'
interface ArtistsProps {
  artists: Array<Artist>
  color: string
  hoverColor: string
}
export default class Artists extends PureComponent<ArtistsProps> {
  hasInfo(id: number) {
    const { color } = this.props
    if (!id) return { fontSize: '12px', color }
    else return { fontSize: '12px', cursor: 'pointer', color, transition: 'color .2s ease' }
  }
  // 鼠标悬停改变颜色
  hover = (id: number): MouseEventHandler => {
    return e => {
      if (!id) return
      (e.target as HTMLSpanElement).style.color = this.props.hoverColor
    }
  }
  // 鼠标离开
  leave = (id: number): MouseEventHandler => {
    return e => {
      if (!id) return
      (e.target as HTMLSpanElement).style.color = this.props.color
    }
  }
  render() {
    const { artists, color } = this.props
    return (
      <div className={style.artists}>
        {
          artists.map((value: Artist, index) => (
            <Fragment key={value.id}>
              <span style={this.hasInfo(value.id)} onMouseEnter={this.hover(value.id)}
                onMouseLeave={this.leave(value.id)} title={value.name}>{value.name}
              </span>
              {index !== artists.length - 1 ? 
                <span className={style.separator} style={{color}}>/</span>
                : <></>}
            </Fragment>
          ))
        }
      </div>
    )
  }
}
