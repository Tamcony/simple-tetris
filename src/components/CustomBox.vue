<template>
  <div class="w-full flex flex-row items-end gap-20 justify-center">
    <div
      class="border-x-2 border-b-2"
      :class="`h-${blockSize * 20} w-${blockSize * 10}`"
    >
      <div class="w-full h-full flex flex-col justify-between relative">
        <CustomBlock
          :type="blockModel.BlockType.LINE"
          :block="blockStore.currentBlock"
          :size="blockSize"
          class="relative"
          :style="{
            top: `${blockStyle.top}px`,
            left: `${blockStyle.left}px`
          }"
        ></CustomBlock>
      </div>
    </div>
    <CustomBlockControl
      @move="handleMove"
      @rotate="handleRotate"
    ></CustomBlockControl>
  </div>
</template>

<script lang="ts" setup>
import * as blockModel from '@/models/blockModel'
import { useBlockStore } from '@/stores/blockStore'

const blockStore = useBlockStore()
const blockSize = ref(20)
const blockStyle = ref({
  top: 0,
  left: 0
})

const renderBlock = () => {
  const centerPosition = blockStore.currentBlock.blockData.position[blockStore.currentBlock.center.index]
  const { offsetX, offsetY } = blockStore.currentBlock.center
  blockStyle.value.top = (centerPosition.y - offsetY) * blockSize.value
  blockStyle.value.left = (centerPosition.x - offsetX) * blockSize.value
}

const handleMove = () => {
  renderBlock()
  console.log('blockStyle', blockStyle.value)
}
const handleRotate = () => {
  blockStore.rotateBlock()
}

onMounted(() => {
  blockStore.randomGennerateBlock()
  renderBlock()
})

</script>

<style lang="less" scoped></style>
