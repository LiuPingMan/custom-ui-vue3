<template>
  <div
    v-for="item of data"
    :key="item.id"
    :class="['list-item', item.disabled ? 'disabled' : '']"
    :draggable="!item.disabled"
    @dragstart="dragItem(item)"
  >
    <input
      type="checkbox"
      :disabled="item.disabled"
      :id="'_checkbox_' + item.id"
      :checked="checkedData.find(({ id }) => id === item.id)"
      @change="checkboxChange($event.target.checked, leftOrRight, item)"
    />
    <label :for="'_checkbox_' + item.id">{{ item.label }}</label>
  </div>
</template>
<script setup>
import { ref } from "vue"
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  leftOrRight: {
    type: String,
    validator(value) {
      return ["left", "right"].includes(value)
    },
  },
  checkedData: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["checkboxChange", "dragItem"])

const checkboxChange = (checked, leftOrRight, item) => {
  emit("checkboxChange", checked, leftOrRight, item)
}

const dragItem = (item) => {
  emit("dragItem", item)
}
</script>
<style scoped lang="less">
.list-item {
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  color: #666;

  &.disabled {
    opacity: 0.6;
  }
}
</style>
