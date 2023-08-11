export function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const nowTime = new Date().getTime()
    if (interval <= nowTime - lastTime) {
      fn.apply(this, args)
      lastTime = nowTime
    }
  }
}
export const monthMap = {
  0: '一月',
  1: '二月',
  2: '三月',
  3: '四月',
  4: '五月',
  5: '六月',
  6: '七月',
  7: '八月',
  8: '九月',
  9: '十月',
  10: '十一月',
  11: '十二月',
}
