import { Link } from 'react-router-dom'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
<<<<<<< HEAD
interface IProps{
  to?: string
  title: string
}

=======
interface IProps {
  to?: string
  title: string
}
>>>>>>> test
export default function NavTitle(props: IProps) {
  const showNav = (): JSX.Element => {
    const { to, title } = props
    if (!to) return (<h1 className={style.title}>{title}</h1>)
    return (
      <Link to={to} className={style['nav-title']}>
        {title}<IconFont type="icon-arrow-right" className={style['nav-icon']} />
      </Link>
    )
  }
  return showNav()
}
