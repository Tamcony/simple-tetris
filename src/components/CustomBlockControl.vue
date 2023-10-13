<template>
  <div class="flex flex-col gap-36">
    <div class="flex flex-row justify-between">
      <a-button @click="emits('start')">开始</a-button>
    </div>
    <div class="flex flex-row justify-between items-end gap-20">
      <div class="flex flex-row">
        <a-button @click="handleChange(blockModel.MoveType.LEFT)">←</a-button>
      </div>
      <div class="flex flex-col">
        <a-button @click="emits('rotate')">↑</a-button>
        <a-button @click="handleChange(blockModel.MoveType.CUSTOME)">↓</a-button>
      </div>
      <div class="flex flex-row">
        <a-button @click="handleChange(blockModel.MoveType.RIGHT)">→</a-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import * as blockModel from '@/models/blockModel'
import { useBlockStore } from '@/stores/blockStore'
import { emit } from 'process'

const blockStore = useBlockStore()

const emits = defineEmits<{
  move: []
  rotate: []
  reset: []
  start: []
  pause: []
}>()

const handleChange = (action: blockModel.MoveType) => {
  blockStore.moveBlock(action)
  emits('move')
}
</script>

<style lang='less' scoped></style>