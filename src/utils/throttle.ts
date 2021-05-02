// 用于事件节流
export default function throttle(this: any, fn: Function, waitTime: number, ...args: any[]) {
  return () => {
    if (this.timer) return
    this.timer = window.setTimeout(() => {
      fn.apply(this, args)
      this.timer = undefined
    }, waitTime)
  }
}

export type TypeOfThrottle = (this: any, fn: Function, waitTime: number, ...args: any[]) => () => void