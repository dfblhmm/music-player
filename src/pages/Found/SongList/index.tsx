import { Fragment, PureComponent, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
const SongListHome = lazy(() => import('./SongListHome'))
const QualitySongList = lazy(() => import('./QualitySongList'))
export default class SongList extends PureComponent {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/found/songlist/quality/:cat" component={QualitySongList} />
          <Route path="/found/songlist" component={SongListHome} />
          <Redirect to="/found/songlist" />
        </Switch>
      </Fragment>
    )
  }
}
