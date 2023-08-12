<template>
  <div class="horizontal-calendar">
    <div class="btn" @click="handleBtnClick('left')">&lt;</div>
    <div class="calendar-content">
      <div
        class="days"
        ref="daysRef"
        :style="{
          transform: `translateX(${translate}px)`,
        }"
      >
        <div
          v-for="day in dayList"
          :class="[
            'day',
            day.isSelected ? 'day-selected' : '',
            day.isDay ? 'day-date' : 'day-month',
            day.showIcon ? 'day-icon' : '',
          ]"
          @click="handleDayClick(day)"
        >
          <div>
            {{ day.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="handleBtnClick('right')">&gt;</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useDayList } from './extends/hooks'

const props = defineProps({
  modelValue: {
    type: String,
  },
  showIcon: {
    type: Function,
    default: () => {},
  },
})
const emit = defineEmits(['update:modelValue'])
const daysRef = ref()

const [dayList, updateDayList, changeSelectedDay] = useDayList(props.modelValue)
const translate = ref(-390)

// 处理连续点击换页
let rolling = false,
  rollFuncStack = []
function nextRoll() {
  return new Promise((resolve) => {
    translate.value -= 400
    daysRef.value.style.transitionDuration = '0.5s'
    setTimeout(() => {
      daysRef.value.style.transitionDuration = '0s'
      translate.value += 400
      updateDayList(true)
      resolve()
    }, 500)
  })
}
function preRoll() {
  return new Promise((resolve) => {
    translate.value += 400
    daysRef.value.style.transitionDuration = '0.5s'
    setTimeout(() => {
      daysRef.value.style.transitionDuration = '0s'
      translate.value -= 400
      updateDayList(false)
      resolve()
    }, 500)
  })
}
async function runRollFunc() {
  const func = rollFuncStack.shift()
  await func()
  if (rollFuncStack.length) {
    setTimeout(() => {
      runRollFunc()
    }, 100)
  } else {
    rolling = false
    // 结束换页后,请求当前日期列表信息
    await props.showIcon(dayList)
  }
}

const handleBtnClick = (direction) => {
  switch (direction) {
    case 'left':
      if (
        rollFuncStack.length &&
        rollFuncStack[rollFuncStack.length - 1] !== preRoll
      ) {
        rollFuncStack = []
      }
      rollFuncStack.push(preRoll)
      break
    case 'right':
      if (
        rollFuncStack.length &&
        rollFuncStack[rollFuncStack.length - 1] !== nextRoll
      ) {
        rollFuncStack = []
      }
      rollFuncStack.push(nextRoll)
      break
  }
  if (!rolling) {
    rolling = true
    runRollFunc()
  }
}

const handleDayClick = (day) => {
  let changeSuccess = changeSelectedDay(day)
  if (changeSuccess) {
    emit('update:modelValue', day.value)
  }
}
onMounted(() => {
  props.showIcon(dayList)
})
</script>
<style scoped lang="less">
.horizontal-calendar {
  display: flex;
  height: 40px;
  width: 600px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-color: #1f1f1f;
  color: #fff;
  .btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #313131;
    box-shadow: 0 0 2px #222;
    cursor: pointer;
    user-select: none;
  }
  .calendar-content {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    .days {
      width: 1600px;
      display: flex;
      // transition-timing-function: ease-out;
      .day {
        width: 40px;
        flex-shrink: 0;
      }
      .day-date div {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #313131;
        box-shadow: 0px 0px 2px #222;
        cursor: pointer;
      }
      .day-month div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      .day-selected div {
        border: 2px solid #e6571b;
        color: #e6571b;
      }
      .day-icon div::after {
        content: '';
        position: absolute;
        border: 6px transparent solid;
        border-left-color: #e6571b;
        right: 0;
        top: 0;
        transform: translate(6px, -6px) rotate(-45deg);
      }
      .day-selected.day-icon div::after {
        transform: translate(8px, -8px) rotate(-45deg);
      }
    }
  }
}
</style>
