import { PureComponent } from 'react'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
interface CategoryProps {
  btnTitle?: string
  navCategory?: Array<string>
}
export default class Category extends PureComponent<CategoryProps> {
  render() {
    const { btnTitle } = this.props
    return (
      <div className={style.container}>
        {
          btnTitle ? <div className={style['btn-change']}>{btnTitle}
            <IconFont type="icon-arrow-right"/></div>: <></>
        }
        <div className={style['nav-category']}></div>
      </div>
    )
  }
}
