<template>
  <button :disabled="leftButtonDisabled" @click="leftButtonClick">&lt;</button>
  <button :disabled="rightButtonDisabled" @click="rightButtonClick">
    &gt;
  </button>
</template>
<script setup>
const props = defineProps({
  leftButtonDisabled: {
    type: Boolean,
    default: true,
  },
  rightButtonDisabled: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(["leftButtonClick", "rightButtonClick"])
const leftButtonClick = () => {
  emit("leftButtonClick")
}
const rightButtonClick = () => {
  emit("rightButtonClick")
}
</script>
<style scoped lang="less">
button {
  border: none;
  outline: none;
  width: 38px;
  height: 38px;
  background-color: orange;
  color: #fff;
  border-radius: 5px;

  &:disabled {
    opacity: 0.6;
  }
}
</style>
