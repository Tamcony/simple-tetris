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
      center: {
        index: 1,
        offsetX: 1,
        offsetY: 1
      },
      blockBoard: new Array(4).fill(0).map(() => {
        return [0, 1, 0, 0]
      }),
      blockData: {
        angle: 0,
        position: [
          {
            x: 3,
            y: 0
          },
          {
            x: 4,
            y: 0
          },
          {
            x: 5,
            y: 0
          },
          {
            x: 6,
            y: 0
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
              x: block.blockData.position[1].x - 1,
              y: block.blockData.position[1].y
            },
            {
              x: block.blockData.position[1].x,
              y: block.blockData.position[1].y
            },
            {
              x: block.blockData.position[1].x + 1,
              y: block.blockData.position[1].y
            },
            {
              x: block.blockData.position[1].x + 2,
              y: block.blockData.position[1].y
            }
          ]
        } else {
          block.blockBoard[1] = [1, 1, 1, 1]

          block.blockData.position = [
            {
              x: block.blockData.position[1].x,
              y: block.blockData.position[1].y - 1
            },
            {
              x: block.blockData.position[1].x,
              y: block.blockData.position[1].y
            },
            {
              x: block.blockData.position[1].x,
              y: block.blockData.position[1].y + 1
            },
            {
              x: block.blockData.position[1].x,
              y: block.blockData.position[1].y + 2
            }
          ]
        }
        break
    }
  }

  const moveBlock = (
    action: blockModel.MoveType = blockModel.MoveType.CUSTOM,
    block: blockModel.Block = currentBlock
  ) => {
    console.log('move:', action)
    switch (action) {
      case blockModel.MoveType.CUSTOM:
        block.blockData.position = block.blockData.position.map((offset) => {
          return {
            x: offset.x,
            y: offset.y + 1
          }
        })
        break
      case blockModel.MoveType.LEFT:
        block.blockData.position = block.blockData.position.map((offset) => {
          return {
            x: offset.x - 1,
            y: offset.y
          }
        })
        break
      case blockModel.MoveType.RIGHT:
        block.blockData.position = block.blockData.position.map((offset) => {
          return {
            x: offset.x + 1,
            y: offset.y
          }
        })
        break
      case blockModel.MoveType.BOTTOM:
        block.blockData.position = block.blockData.position.map((offset) => {
          return {
            x: offset.x,
            y: offset.y + 1
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
    moveBlock,
    randomGennerateBlock
  }
})
