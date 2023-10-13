<template>
  <div class="flex flex-row justify-between items-end">
    <div class="flex flex-row">
      <a-button>←</a-button>
    </div>
    <div class="flex flex-col">
      <a-button @click="blockStore.rotateBlock()">↑</a-button>
      <a-button>↓</a-button>
    </div>
    <div class="flex flex-row">
      <a-button>→</a-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useBlockStore } from '@/stores/blockStore'

const blockStore = useBlockStore()

</script>

<style lang='less' scoped></style>