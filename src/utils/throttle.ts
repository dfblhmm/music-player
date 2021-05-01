// 用于事件节流
export default function throttle(this: any, fn: Function, waitTime: number, ...args: any[]) {
  let timer: number | undefined = undefined
  return () => {
    if (timer) return
    timer = window.setTimeout(() => {
      fn.apply(this, args)
      timer = undefined
    }, waitTime)
  }
}