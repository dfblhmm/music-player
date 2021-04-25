import { nanoid } from 'nanoid'
import { PureComponent, Fragment, MouseEventHandler } from 'react'
import style from './index.module.scss'
interface IProps {
  artists: Array<Artist>
  color: string
  hoverColor?: string
  fontSize?: number
}
export default class Artists extends PureComponent<IProps> {
  hasInfo(id: number) {
    const { color } = this.props
    const fontSize = this.props.fontSize ? `${this.props.fontSize}px` : '12px'
    if (!id) return { fontSize, color }
    else return { fontSize, cursor: 'pointer', color, transition: 'color .2s ease' }
  }
  // 鼠标悬停改变颜色
  hover = (id: number): MouseEventHandler => {
    return e => {
      const { hoverColor } = this.props
      if (!hoverColor || !id) return
      (e.target as HTMLSpanElement).style.color = hoverColor!
    }
  }
  // 鼠标离开
  leave = (id: number): MouseEventHandler => {
    return e => {
      const { hoverColor, color } = this.props
      if (!hoverColor || !id) return
      (e.target as HTMLSpanElement).style.color = color
    }
  }
  render() {
    const { artists, color, fontSize } = this.props
    return (
      <div className={style.artists}>
        {
          artists.map((value: Artist, index) => (
            <Fragment key={value.id ? value.id: nanoid()}>
              <span style={this.hasInfo(value.id)} onMouseEnter={this.hover(value.id)}
                onMouseLeave={this.leave(value.id)} title={value.name}>{value.name}
              </span>
              {index !== artists.length - 1 && 
                <span className={style.separator} style={{color, fontSize}}>/</span>}
            </Fragment>
          ))
        }
      </div>
    )
  }
}
