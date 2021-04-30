// 用于事件节流
export default function throttle(fn: any, waitTime: number) {
  let timer: number | undefined = undefined
  let isInit = true
  return function() {
    if (isInit) {
      fn()
      return isInit = false
    }
    clearTimeout(timer)
    timer = window.setTimeout(() => fn(), waitTime)
  }
}