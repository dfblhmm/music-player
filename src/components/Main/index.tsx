import { PureComponent, Fragment, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import style from './index.module.scss'
// 按需加载路由组件
const Found = lazy(() => import('@pages/Found'))
const Video = lazy(() => import('@pages/Video'))
const Friends = lazy(() => import('@pages/Friends'))
const FM = lazy(() => import('@pages/FM'))
const MyCloud = lazy(() => import('@pages/MyCloud'))
const MyRadio = lazy(() => import('@pages/MyRadio'))
const MyCollection = lazy(() => import('@pages/MyCollection'))
const Exclusive = lazy(() => import('@pages/Exclusive'))
export default class ContentContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <Suspense fallback={<Spin className={style.spin} />}>
          <Switch>
            <Route path="/found/exclusive" component={Exclusive} />
            <Route path="/found" component={Found} />
            <Route path="/video" component={Video} />
            <Route path="/friends" component={Friends} />
            <Route path="/fm" component={FM}/>
            <Route path="/my-cloud" component={MyCloud} />
            <Route path="/my-radio" component={MyRadio}/>
            <Route path="/my-collection" component={MyCollection} />
            <Redirect to="/found" />
          </Switch>
        </Suspense>
      </Fragment>
    )
  }
}
