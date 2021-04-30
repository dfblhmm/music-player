// 用于事件节流
export default function throttle(this: any, fn: any, waitTime: number, ...args: any[]) {
  let timer: number | undefined = undefined
  let isInit = true
  return () => {
    if (isInit) {
      fn.apply(this, args)
      return isInit = false
    }
    clearTimeout(timer)
    timer = window.setTimeout(fn.bind(this, args), waitTime)
  }
}