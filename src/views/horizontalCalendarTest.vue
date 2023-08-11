<template>
  <h2>当前日期:{{ date }}</h2>
  <cus-horizontal-calendar
    v-model="date"
    :showIcon="mockDayListInfo"
  ></cus-horizontal-calendar>
</template>
<script setup>
import { ref } from 'vue'
const date = ref('2023-06-12')
const mockDayListInfo = (dayList) => {
  console.log(dayList)
  return new Promise((resolve) => {
    setTimeout(() => {
      dayList.value = dayList.value.map((item) => {
        let hasContent = parseInt(item.label) % 3 === 0 ? false : true
        if (item.isDay) item.showIcon = hasContent
        return item
      })
      resolve()
    }, 200)
  })
}
</script>
<style></style>
