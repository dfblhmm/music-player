export default function format(time: number): string {
  if (!time) return '00:00'
  let minute: number | string = Math.floor(time / 60)
  let second: number | string = Math.floor(time % 60)
  minute = minute < 10 ? '0' + minute : `${minute}`
  second = second < 10 ? '0' + second : `${second}`
  return `${minute}:${second}`
}