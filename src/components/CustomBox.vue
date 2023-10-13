<template>
  <div
    class="border-x-2 border-b-2"
    :class="'h-400 w-200'"
  >
    <div class="w-full h-full flex flex-col justify-between">
      <CustomBlock
        :type="BlockType.LINE"
        :block="blockStore.currentBlock"
      ></CustomBlock>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlockType } from '@/models/blockModel'
import { useBlockStore } from '@/stores/blockStore'

const blockStore = useBlockStore()
const currenBlockId = ref('')

onMounted(() => {
  blockStore.randomGennerateBlock()
})
</script>

<style lang="less" scoped></style>
