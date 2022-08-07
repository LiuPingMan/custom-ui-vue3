import { computed, reactive, ref } from "vue"

export function useTargetIndex(initialIndex) {
  const targetIndex = ref(initialIndex)

  function setTargetIndex(newIndex) {
    targetIndex.value = Number(newIndex)
  }

  return [targetIndex, setTargetIndex]
}

export function useRightListData(initialData, checkedData) {
  const rightListData = ref(initialData)

  function addRightListData(newData) {
    newData.forEach((item) => {
      !rightListData.value.find(({ id }) => item.id === id) &&
        rightListData.value.push(item)
    })
    checkedData.left = checkedData.left.filter(
      (item) => !newData.find(({ id }) => item.id === id)
    )
  }

  function removeRightListData(newData) {
    rightListData.value = rightListData.value.filter(
      (item) => !newData.find(({ id }) => item.id === id)
    )
    checkedData.right = checkedData.right.filter(
      (item) => !newData.find(({ id }) => item.id === id)
    )
  }

  return [rightListData, addRightListData, removeRightListData]
}

export function useCheckedData() {
  const checkedData = reactive({
    left: [],
    right: [],
  })

  function addCheckedData(leftOrRight, item) {
    switch (leftOrRight) {
      case "left":
        checkedData.left = [...checkedData.left, item]
        break
      case "right":
        checkedData.right = [...checkedData.right, item]
        break
      default:
        break
    }
  }

  function removeCheckData(leftOrRight, item) {
    switch (leftOrRight) {
      case "left":
        checkedData.left = checkedData.left.filter(({ id }) => item.id !== id)
        break
      case "right":
        checkedData.right = checkedData.right.filter(({ id }) => item.id !== id)
        break
      default:
        break
    }
  }

  function checkAllData(leftOrRight, data) {
    switch (leftOrRight) {
      case "left":
        checkedData.left = data.value.filter((item) => !item.disabled)
        break
      case "right":
        checkedData.right = data.value.filter((item) => !item.disabled)
        break
      default:
        break
    }
  }

  function clearAllData(leftOrRight) {
    switch (leftOrRight) {
      case "left":
        checkedData.left.length && (checkedData.left = [])
        break
      case "right":
        checkedData.right.length && (checkedData.right = [])
        break
      default:
        break
    }
  }

  return [
    checkedData,
    addCheckedData,
    removeCheckData,
    checkAllData,
    clearAllData,
  ]
}

export function useCheckAll() {
  const checkAll = reactive({
    left: false,
    right: false,
  })
  function toggleCheckAll(leftOrRight, value) {
    checkAll[leftOrRight] = value
  }

  return [checkAll, toggleCheckAll]
}

export function useDragedItem() {
  const dragedItem = ref(null)

  function setDragedItem(item) {
    dragedItem.value = item
  }

  return [dragedItem, setDragedItem]
}

export function useComputeData(data, targetIndex, rightListData, checkedData) {
  const leftTitle = computed(() => data[targetIndex.value].title)

  const leftListData = computed(() => {
    const { data: currentData } = data[targetIndex.value]
    return currentData.filter((item) => {
      return !rightListData.value.find(({ id }) => item.id === id)
    })
  })

  const transferButtonDisabled = computed(() => ({
    left: checkedData.right.length === 0,
    right: checkedData.left.length === 0,
  }))

  const leftCheckAllDisabled = computed(
    () => !leftListData.value.filter((item) => !item.disabled).length
  )

  const rightCheckAllDisabled = computed(
    () => !rightListData.value.filter((item) => !item.disabled).length
  )

  return {
    leftTitle,
    leftListData,
    transferButtonDisabled,
    leftCheckAllDisabled,
    rightCheckAllDisabled,
  }
}
