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
// 歌手信息
interface Artist {
  id: number
  name: string
}
// 图片卡片组件
interface ImgCardType extends ImgCardIconType {
  id: number
  picUrl: string
  sPicUrl?: string
  name: string
  playCount?: number
  artists?: Array<Artist> // 歌手数组
  duration?: number // 资源的时长
  rcmdtext?: string // 电台类型
  avatarDetail?: {identityIconUrl: string} // 歌单作者头像信息
  userId?: number
  nickname?: string
}
// 控制不同的卡片是否显示特定的图标
interface ImgCardIconType {
  showPlayIcon?: boolean // 是否显示播放图标
  showVideoIcon?: boolean // 是否显示图片左上角的播放视频图标
  maskTitle?: string // 是否显示遮罩层
  ellipsis?: boolean // 文字溢出时是否使用省略号代替
}
// 歌曲信息
interface SongItem {
  id: number
  artists: Array<Artist>
  name: string
  picUrl: string
  mvid: number
  maxbr: number
  alias?: string
}