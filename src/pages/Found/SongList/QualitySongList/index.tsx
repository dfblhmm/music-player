import { PureComponent, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import http from 'utils/http'
import IconFont from 'components/IconFont'
import NavTitle from 'components/NavTitle'
import Category from 'components/Category'
import style from './index.module.scss'
export default class QualitySongList extends PureComponent<RouteComponentProps> {
  state = {
    categoryList: []
  }
  async componentDidMount() {
     const res = await http('/playlist/highquality/tags')
     this.getQualityTags(res.tags)
  }
  // 获取所有精品歌单标签
  getQualityTags(res: Array<Artist>) {
    const categoryList: Array<{sub: Array<{id: number, name: string}>}> = []
    categoryList[0] = { sub: res }
    this.setState({ categoryList })  
  }
  // 获取当前标签的精品歌单
  getHighQualitySongList() {
    
  }
  // 切换分类
  changeCategory = (cat: string) => {
    console.log(cat)
  }
  render() {
    // 获取传递的当前的标签
    const { match: { params } } = this.props
    const btnElement: JSX.Element = (
      <Fragment>
        <IconFont type="icon-choose" style={{fontSize:'14px', marginRight:'4px'}} />
        {(params as {cat: string}).cat}
      </Fragment>
    )
    const btnStyle = {fontSize: '13px', padding: '6px 10px'}
    // 获取所有精品歌单标签
    const { categoryList } = this.state
    return (
      <div className={style['quality-songlist-container']}>
        <NavTitle title="精品歌单" />
        <Category cardPosition="right" btnElement={btnElement} width={550} 
          categoryItemStyle={{flex: '20%', fontSize: '13px'}} changeCategory={this.changeCategory}
          btnTitle="全部歌单" btnStyle={btnStyle} categoryList={categoryList} />
      </div>
    )
  }
}