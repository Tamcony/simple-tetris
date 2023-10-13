<template>
  <div class="flex flex-row  items-center">
    <div
      v-for="row in block.blockBoard"
      class="flex flex-col justify-between items-center"
    >
      <div v-for="item in row">

        <CustomGridItem :item="item"></CustomGridItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlockType, Block } from '@/models/blockModel'

const props = defineProps<{
  type: BlockType
  block: Block
  size: number
}>()

</script>

<style lang="less" scoped></style>
