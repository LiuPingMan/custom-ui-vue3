<template>
  <div>
    <selecter :data="options" @select-change="setSelectChange"></selecter>
  </div>
  <div>
    <div class="transfer">
      <div
        class="box left-list"
        @dragover.prevent
        @drop="removeRightListData([dragedItem])"
      >
        <list-title
          :title="leftTitle"
          v-model:checked="checkAll.left"
          :disabled="leftCheckAllDisabled"
        />
        <div class="list-content">
          <list-item
            :data="leftListData"
            :checked-data="checkedData.left"
            left-or-right="left"
            @checkbox-change="setCheckedData"
            @drag-item="setDragedItem"
          />
        </div>
      </div>
      <div class="box button-group">
        <button-group
          :left-button-disabled="transferButtonDisabled.left"
          :right-button-disabled="transferButtonDisabled.right"
          @left-button-click="removeRightListData(checkedData.right)"
          @right-button-click="addRightListData(checkedData.left)"
        ></button-group>
      </div>
      <div
        class="box right-list"
        @dragover.prevent
        @drop="addRightListData([dragedItem])"
      >
        <list-title
          :title="rightTitle"
          v-model:checked="checkAll.right"
          :disabled="rightCheckAllDisabled"
        />
        <div class="list-content">
          <list-item
            :data="rightListData"
            :checked-data="checkedData.right"
            left-or-right="right"
            @checkbox-change="setCheckedData"
            @drag-item="setDragedItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import Selecter from "./components/Selecter.vue"
import ListTitle from "./components/ListTitle.vue"
import ButtonGroup from "./components/ButtonGroup.vue"
import ListItem from "./components/ListItem.vue"
import propsDefination from "./extends/props"
import {
  useCheckedData,
  useComputeData,
  useDragedItem,
  useRightListData,
  useTargetIndex,
  useCheckAll,
} from "./extends/hooks"
const props = defineProps(propsDefination)
const options = props.data.map(({ title }) => title)
const [targetIndex, setTargetIndex] = useTargetIndex(0)
const [
  checkedData,
  addCheckedData,
  removeCheckData,
  checkAllData,
  clearAllData,
] = useCheckedData()

const [checkAll, toggleCheckAll] = useCheckAll()
const [rightListData, addRightListData, removeRightListData] = useRightListData(
  [],
  checkedData
)

const [dragedItem, setDragedItem] = useDragedItem()
const {
  leftTitle,
  leftListData,
  transferButtonDisabled,
  leftCheckAllDisabled,
  rightCheckAllDisabled,
} = useComputeData(props.data, targetIndex, rightListData, checkedData)

const setSelectChange = (index) => {
  setTargetIndex(index)
  toggleCheckAll("left", false)
  clearAllData("left")
}

const setCheckedData = (checked, leftOrRight, item) => {
  checked
    ? addCheckedData(leftOrRight, item)
    : removeCheckData(leftOrRight, item)
}

watch(
  () => checkAll.left,
  (newValue) => {
    if (newValue) {
      checkAllData("left", leftListData)
    } else {
      const length = leftListData.value.filter((item) => !item.disabled).length
      if (checkedData.left.length === length) {
        clearAllData("left")
      }
    }
  }
)
watch(
  () => checkAll.right,
  (newValue) => {
    if (newValue) {
      checkAllData("right", rightListData)
    } else {
      const length = rightListData.value.filter((item) => !item.disabled).length
      if (checkedData.right.length === length) {
        clearAllData("right")
      }
    }
  }
)
watch(
  () => checkedData.left,
  () => {
    const length = leftListData.value.filter((item) => !item.disabled).length
    if (checkedData.left.length !== length || checkedData.left.length === 0) {
      toggleCheckAll("left", false)
    } else {
      toggleCheckAll("left", true)
    }
  }
)
watch(
  () => checkedData.right,
  () => {
    const length = rightListData.value.filter((item) => !item.disabled).length
    if (checkedData.right.length !== length || checkedData.right.length === 0) {
      toggleCheckAll("right", false)
    } else {
      toggleCheckAll("right", true)
    }
  }
)
</script>
<style scoped lang="less">
.transfer {
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 300px;
  border: 1px solid #ddd;

  .box {
    width: 120px;
    height: 100%;

    .list-content {
      height: 261px;
      overflow-y: auto;
    }
    &.button-group {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
}
</style>
