import { PureComponent, MouseEvent } from 'react'
import { Card } from 'antd'
import IconFont from '@/components/IconFont'
import style from './index.module.scss'
import { nanoid } from 'nanoid'
interface CategoryProps {
  btnElement?: JSX.Element // 按钮React节点
  btnStyle?: {width?: string, height?: string, padding?: string, fontSize?: string} // 按钮样式
  btnTitle?: string // 按钮文字
  hotCategoryList?: Array<{id: number, name: string}> // 热门分类
  categoryList?: Array<{category?: string, icon?: string, sub: Array<{name: string, hot: boolean}>}>
  cardPosition: 'left' | 'right'
  width?: number // 卡片的宽
  changeCategory? : (cat: string) => void // 点击了分类后的回调
  categoryItemStyle?: {flex: string, fontSize?: string} // 每个子分类的flex占比和字体大小
}
export default class Category extends PureComponent<CategoryProps> {
  card?: HTMLElement | null
  state = {
    showCard: false    
  }
  componentDidMount() {
    // 点击了卡片之外的区域，隐藏卡片
    const { categoryList } = this.props
    if (!categoryList) return
    window.onclick = () => {
      if (this.card) this.setState({showCard: false}) 
    }
  }
  componentWillUnmount() {
    // 移除事件监听
    window.onclick = null
  }
  // 是否显示分类选择区域
  showAllCategory(): JSX.Element {
    const { categoryList } = this.props
    if (!categoryList) return (<></>)
    // 确定卡片的位置
    const { cardPosition, width } = this.props
    const cssStyle: Data = cardPosition === 'left' ? {'left': '-2px'} : {'right': '2px'}
    // 卡片头部
    const { btnTitle, changeCategory } = this.props
    const title: JSX.Element = (
      <span className={style['card-head']}
        onClick={() => changeCategory!(btnTitle!)}>{btnTitle}</span>
    )
    // 每个子分类的样式
    const { flex, fontSize } = this.props.categoryItemStyle!
    const liStyle = { flex, fontSize, maxWidth: flex }
    // 渲染子分类
    const subCategory = (sub: Array<{name: string, hot: boolean}>): JSX.Element => 
       <ul className={style['sub-item-container']}>
         {
           sub.map(value => 
             <li key={value.name} onClick={() => this.clickCategory(value.name)} 
              style={liStyle}>
               {/* 每个子分类的名字 */}
               <span style={{position: 'relative'}}>
                 {value.name}{value.hot? <i className={style['hot-category']}>HOT</i>:<></>}
               </span>
             </li>
           )
         }
       </ul>
    const { showCard } = this.state
    cssStyle.display = showCard ? 'flex' : 'none'
    return (
      <div className={style['category-card']} style={cssStyle} ref={c => this.card = c}>
        <Card title={title} hoverable bodyStyle={{padding: '0', cursor:'default'}} 
          style={{width: width + 'px'}} headStyle={{cursor: 'default'}}
          >
          {/* 卡片主体区域   */}
          <div className={style['category-list']} onClick={e => e.stopPropagation()}>
            {
              categoryList.map(value => 
                <div className={style['category-item']} key={nanoid()}>
                  {/* 每个主分类 */}
                  {value.category? <div className={style.category}>
                    {value.icon ? <IconFont type={value.icon} className={style.icon} />
                    :<></>}{value.category}</div>: <></>}
                  {/* 对应的子分类 */}
                  {subCategory(value.sub)}
                </div>
              )
            }
          </div>
        </Card>
      </div>
    )
  }
  // 是否显示导航分类
  showNavCategory(): JSX.Element {
    const { hotCategoryList } = this.props
    if (!hotCategoryList) return (<></>)
    const { changeCategory } = this.props
    return (
      <div className={style['nav-category']}>
        <ul>
          {
            hotCategoryList.map(value => <li key={value.id} 
              onClick={() => changeCategory!(value.name)}>{value.name}</li>)
          }
        </ul>
      </div>
    )
  }
  // 切换了分类
  clickCategory = (tag: string) => {
    const { changeCategory } = this.props
    // 关闭卡片
    this.setState({showCard: !this.state.showCard})
    changeCategory!(tag)
  }
  // 获取所有分类
  showCardArea = (e: MouseEvent) => {
    e.stopPropagation()
    this.card && this.setState({showCard: !this.state.showCard})
  }
  render() {
    const { btnElement, btnStyle } = this.props
    return (
      <div className={style.container}>
        {
          btnElement ? <div className={style['btn-change']} style={btnStyle}
            onClick={e=> this.showCardArea(e)}>{btnElement}</div>: <></>
        }
        {/* 是否显示分类选择区域 */}
        {this.showAllCategory()}
        {/* 是否显示导航分类 */}
        {this.showNavCategory()}
      </div>
    )
  }
}
