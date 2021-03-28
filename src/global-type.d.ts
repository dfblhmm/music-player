// 对象类型
interface Data {
  [key: string]: any
}
// 轮播图
interface Banners {
  targetId: number // id
  imageUrl: string // 缩略图
  /* 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 
  1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合 */
  targetType: number // 轮播图对应的资源类型
  titleColor: string // 文字背景色
  typeTitle: string // 轮播图对应的类型
  url: string | null // 对应的url地址 
}
// 图片卡片组件
interface ImgCardType {
  id: number
  picUrl: string
  name: string
  showPlayCount: boolean
  playCount?: number
}