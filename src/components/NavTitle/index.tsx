import { Link } from 'react-router-dom'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface IProps{
  to?: string
  title: string
}
export default function NavTitle(props: IProps) {
  const { to, title } = props
  if (!to) return (<h1 className={style.title}>{title}</h1>)
  return (
    <Link to={to} className={style['nav-title']}>
      {title}<IconFont type="icon-arrow-right" className={style['nav-icon']} />
    </Link>
  )
}
