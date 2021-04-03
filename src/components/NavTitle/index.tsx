import { Fragment, PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePath } from 'redux/actions/navLink'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
interface NavTitleProps{
  to?: string
  title: string
}
export default class NavTitle extends PureComponent<NavTitleProps> {
  clickLink = (to: string) => {
    (this.props as any).updatePath('redux')
  }
  showNav(): JSX.Element {
    const { to, title } = this.props
    if (!to) return (<h1 className={style.title}>{title}</h1>)
    return (
      <Link to={to} className={style['nav-title']} onClick={() => this.clickLink(to)}>
        {title}<IconFont type="icon-arrow-right" className={style['nav-icon']} />
      </Link>
    )
  }
  render() {
    return (
      <Fragment>{this.showNav()}</Fragment>
    )
  }
}

// export default connect(
//   state => {},
//   {updatePath}
// )(NavTitle)
