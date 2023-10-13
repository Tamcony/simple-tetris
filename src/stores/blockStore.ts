import { defineStore } from 'pinia'
import * as blockModel from '@/models/blockModel'
import { v4 as uuidv4 } from 'uuid'

export const useBlockStore = defineStore('blockStore', () => {
  const defaultBlock: {
    line: blockModel.Block
  } = {
    line: {
      id: '',
      type: blockModel.BlockType.LINE,
      length: 4,
      blockBoard: new Array(4).fill(0).map(() => {
        return [0, 1, 0, 0]
      }),
      blockData: {
        angle: 0,
        position: [
          {
            offsetX: 3,
            offsetY: 0
          },
          {
            offsetX: 4,
            offsetY: 0
          },
          {
            offsetX: 5,
            offsetY: 0
          },
          {
            offsetX: 6,
            offsetY: 0
          }
        ]
      }
    }
  }

  const currentBlock = reactive<blockModel.Block>(defaultBlock.line)

  const initBlockBoard = (block: blockModel.Block = currentBlock) => {
    //初始化方块
    switch (block.type) {
      case blockModel.BlockType.LINE:
        block = defaultBlock.line
        break
    }
  }

  const rotateBlock = (block: blockModel.Block = currentBlock) => {
    //顺时针旋转
    if (block.blockData.angle === 270) {
      block.blockData.angle = 0
    } else {
      block.blockData.angle += 90
    }
    //旋转方块
    switch (block.type) {
      case blockModel.BlockType.LINE:
        block.blockBoard = new Array(4).fill(new Array(4).fill(0))
        if (block.blockData.angle == 0 || block.blockData.angle == 180) {
          block.blockBoard.forEach((item) => (item[1] = 1))
          block.blockData.position = [
            {
              offsetX: block.blockData.position[1].offsetX - 1,
              offsetY: block.blockData.position[1].offsetY
            },
            {
              offsetX: block.blockData.position[1].offsetX,
              offsetY: block.blockData.position[1].offsetY
            },
            {
              offsetX: block.blockData.position[1].offsetX + 1,
              offsetY: block.blockData.position[1].offsetY
            },
            {
              offsetX: block.blockData.position[1].offsetX + 2,
              offsetY: block.blockData.position[1].offsetY
            }
          ]
        } else {
          block.blockBoard[1] = [1, 1, 1, 1]

          block.blockData.position = [
            {
              offsetX: block.blockData.position[1].offsetX,
              offsetY: block.blockData.position[1].offsetY - 1
            },
            {
              offsetX: block.blockData.position[1].offsetX,
              offsetY: block.blockData.position[1].offsetY
            },
            {
              offsetX: block.blockData.position[1].offsetX,
              offsetY: block.blockData.position[1].offsetY + 1
            },
            {
              offsetX: block.blockData.position[1].offsetX,
              offsetY: block.blockData.position[1].offsetY + 2
            }
          ]
        }
        break
    }
  }

  const moveBlock = (
    action: blockModel.moveType = blockModel.moveType.CUSTOM,
    block: blockModel.Block = currentBlock
  ) => {
    switch (action) {
      case blockModel.moveType.CUSTOM:
        block.blockData.position.map((offset) => {
          return {
            offsetX: offset.offsetX,
            offsetY: offset.offsetY + 1
          }
        })
        break
      case blockModel.moveType.LEFT:
        block.blockData.position.map((offset) => {
          return {
            offsetX: offset.offsetX - 1,
            offsetY: offset.offsetY
          }
        })
        break
      case blockModel.moveType.RIGHT:
        block.blockData.position.map((offset) => {
          return {
            offsetX: offset.offsetX + 1,
            offsetY: offset.offsetY
          }
        })
        break
      case blockModel.moveType.BOTTOM:
        block.blockData.position.map((offset) => {
          return {
            offsetX: offset.offsetX + 3,
            offsetY: offset.offsetY
          }
        })
        break
    }
  }

  const randomGennerateBlock = () => {
    currentBlock.id = uuidv4()
    //TODO 这里用随机
    const randomArr = [blockModel.BlockType.LINE]
    currentBlock.type = randomArr[Math.floor(Math.random() * randomArr.length)]
    initBlockBoard()
  }

  return {
    currentBlock,
    initBlockBoard,
    rotateBlock,
    randomGennerateBlock
  }
})
