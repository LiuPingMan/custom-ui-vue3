<template>
  <h1 class="list-title">
    <input
      type="checkbox"
      :id="'_checkbox_' + title"
      :checked="checked"
      :disabled="disabled"
      @change="checkChange($event.target.checked)"
    />
    <label :for="'_checkbox_' + title">{{ title }}</label>
  </h1>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["update:checked"])
const checkChange = (value) => {
  emit("update:checked", value)
}
</script>
<style scoped lang="less">
.list-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 38px;
  font-weight: normal;
  margin: 0;
  color: #666;
  border-bottom: 1px solid #ddd;
  background-color: #efefef;
  font-size: 14px;
}
</style>
