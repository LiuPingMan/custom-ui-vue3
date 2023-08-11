<template>
  <cus-transfer :data="data" rightTitle="已选机型"></cus-transfer>
</template>
<script setup>
import { reactive } from '@vue/reactivity'

const data = reactive([
  {
    title: '华为',
    data: [
      {
        id: 1,
        label: 'mate 12',
      },
      {
        id: 2,
        label: 'mate 13',
        disabled: true,
      },
      {
        id: 3,
        label: 'mate 14',
      },
      {
        id: 4,
        label: 'mate 15',
      },
      {
        id: 5,
        label: 'mate 16',
      },
      {
        id: 6,
        label: 'mate 17',
      },
    ],
  },
  {
    title: '小米',
    data: [
      {
        id: 7,
        label: 'mi 12',
      },
      {
        id: 8,
        label: 'mi 13',
      },
      {
        id: 9,
        label: 'mi 14',
      },
      {
        id: 10,
        label: 'mi 15',
      },
      {
        id: 11,
        label: 'mi 16',
      },
      {
        id: 12,
        label: 'mi 17',
      },
    ],
  },
  {
    title: 'iphone',
    data: [
      {
        id: 13,
        label: 'iphone 12',
      },
      {
        id: 14,
        label: 'iphone 13',
      },
      {
        id: 15,
        label: 'iphone 14',
      },
      {
        id: 16,
        label: 'iphone 15',
      },
      {
        id: 17,
        label: 'iphone 16',
      },
      {
        id: 18,
        label: 'iphone 17',
      },
    ],
  },
])
</script>
<style></style>
