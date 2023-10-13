<template>
  <div
    class="flex justify-between items-center rounded-md"
    :class="`h-${blockStore.config.blockSize} w-${blockStore.config.blockSize} ${item === 0 ? ' border-0' : 'bg-#000 border-1'}`"
  >
  </div>
</template>

<script lang='ts' setup>
import { useBlockStore } from '@/stores/blockStore'

const blockStore = useBlockStore()

const props = defineProps<{
  item: number
}>()

</script>

<style lang='less' scoped></style>