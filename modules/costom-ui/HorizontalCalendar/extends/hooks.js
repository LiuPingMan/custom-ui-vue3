import { ref } from 'vue'
import dayjs from 'dayjs'
import { monthMap } from '../utils/index'
export function useDayList(initDay = new Date()) {
  const dayList = ref([])
  const maxLength = 40, //日历渲染长度
    updateStep = 10, // 日历更新步长
    initDayIndex = 15 // 初始日期的下标
  /**
   * 初始化日期列表
   */
  function initDayList() {
    let dayArray = []
    initDay = dayjs(initDay)
    for (let index = -initDayIndex; index < maxLength - initDayIndex; index++) {
      let day
      if (index < 0) {
        day = initDay.subtract(Math.abs(index), 'day')
      } else if (index > 0) {
        day = initDay.add(index, 'day')
      } else {
        day = initDay
      }
      let isToday = dayjs().isSame(day, 'day')
      let isDay = day.date() === 1 ? false : true
      if (!isDay) {
        let month = monthMap[day.month()]
        dayArray.push({
          label: month,
          value: day.format('YYYY-MM-DD'),
          isSelected: false,
          isToday: false,
          isDay: false,
          showIcon: false,
        })
        index++
      }
      dayArray.push({
        label: isToday ? '今' : day.date() + '',
        value: day.format('YYYY-MM-DD'),
        isSelected: index === 0,
        isToday,
        isDay: true,
        showIcon: false,
      })
    }
    dayList.value = dayArray
  }
  /**
   * 更新日期列表
   * @param {boolean} flag true新增新日期，false新增旧日期
   */
  function updateDayList(flag) {
    let dayArray = []
    if (flag) {
      let lastDay = dayjs(dayList.value[dayList.value.length - 1].value)
      for (let index = 1; index <= updateStep; index++) {
        let day = lastDay.add(index, 'day')
        let isToday = dayjs().isSame(day, 'day')
        let isDay = day.date() === 1 ? false : true
        if (!isDay) {
          let month = monthMap[day.month()]
          dayArray.push({
            label: month,
            value: day.format('YYYY-MM-DD'),
            isSelected: false,
            isToday: false,
            isDay: false,
            showIcon: false,
          })
          index++
        }
        dayArray.push({
          label: isToday ? '今' : day.date() + '',
          value: day.format('YYYY-MM-DD'),
          isSelected: index === 0,
          isToday,
          isDay: true,
          showIcon: false,
        })
      }
      dayList.value = [...dayList.value.slice(updateStep), ...dayArray]
    } else {
      let firstDay = dayjs(dayList.value[0].value)
      for (let index = updateStep; index >= 1; index--) {
        let day = firstDay.subtract(index, 'day')
        let isToday = dayjs().isSame(day, 'day')
        let isDay = day.date() === 1 ? false : true
        if (!isDay) {
          let month = monthMap[day.month()]
          dayArray.push({
            label: month,
            value: day.format('YYYY-MM-DD'),
            isSelected: false,
            isToday: false,
            isDay: false,
            showIcon: false,
          })
          index--
        }
        dayArray.push({
          label: isToday ? '今' : day.date(),
          value: day.format('YYYY-MM-DD'),
          isSelected: index === 0,
          isToday,
          isDay: true,
          showIcon: false,
        })
      }
      dayList.value = [
        ...dayArray,
        ...dayList.value.slice(0, maxLength - updateStep),
      ]
    }
  }
  function changeSelectedDay(day) {
    if (!day.isDay) return false
    dayList.value = dayList.value.map((item) => {
      if (item.value === day.value && item.isDay) {
        item.isSelected = true
      } else {
        item.isSelected = false
      }
      return item
    })
    return true
  }
  initDayList()
  return [dayList, updateDayList, changeSelectedDay]
}
