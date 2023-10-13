<template>
  <div class="w-full flex flex-row items-end gap-20 justify-center">
    <div
      class="flex border-x-2 border-b-2"
      :style="{
        height: `${blockStore.config.blockSize * blockStore.config.containerSize.height}px`,
        width: `${blockStore.config.blockSize * blockStore.config.containerSize.width}px`
      }"
    >
      <div class="w-full h-full flex flex-row justify-between relative">
        <template v-for="item in blockStore.currentBlockBox.blockList">
          <CustomBlock
            :type="blockModel.BlockType.LINE"
            :block="item"
            :size="blockStore.config.blockSize"
            class="absolute"
            :style="{
              top: `${renderBlock(item).top}px`,
              left: `${renderBlock(item).left}px`
            }"
          ></CustomBlock>
        </template>

        <div
          v-for="row in blockStore.currentBlockBox.blockPositions"
          class="flex flex-col justify-between items-center "
        >
          <div
            v-for="item in row"
            class="flex flex-row "
          >
            <CustomGridItem :item="item"></CustomGridItem>
          </div>
        </div>
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

const renderBlock = (block: blockModel.Block) => {
  const blockStyle = {
    top: 0,
    left: 0
  }
  const centerPosition = block.blockData.position[blockStore.currentBlock.center.index]
  const { offsetX, offsetY } = block.center
  blockStyle.top = (centerPosition.y - offsetY) * blockStore.config.blockSize
  blockStyle.left = (centerPosition.x - offsetX) * blockStore.config.blockSize
  return blockStyle
}

const handleMove = () => {
  renderBlock(blockStore.currentBlock)
  // console.log('blockStyle', blockStyle.value)
}
const handleRotate = () => {
  blockStore.rotateBlock(blockStore.currentBlock)
}

onMounted(() => {
  blockStore.startGame()
  renderBlock(blockStore.currentBlock)
})

</script>

<style lang="less" scoped></style>
