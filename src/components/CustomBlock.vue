<template>
  <div class="w-full  flex flex-row justify-center items-center">
    <div class="flex flex-row justify-center items-center">
      <div
        v-for="row in block.blockBoard"
        class="flex flex-col justify-between items-center"
      >
        <div
          v-for="item in row"
          class="h-20 w-20 flex justify-between items-center"
          :class="item === 0 ? 'bg-#fff border-0' : 'bg-#000 border-1'"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlockType, Block } from '@/models/blockModel'

const props = defineProps<{
  type: BlockType
  block: Block
}>()

</script>

<style lang="less" scoped></style>
