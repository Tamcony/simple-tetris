import { defineStore } from 'pinia'
import * as blockModel from '@/models/blockModel'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash'

export const useBlockStore = defineStore('blockStore', () => {
  const config = ref({
    blockSize: 20,
    containerSize: {
      height: 20,
      width: 10
    }
  })
  const defaultBlock: {
    I: blockModel.Block
    O: blockModel.Block
    J: blockModel.Block
    L?: blockModel.Block
    T?: blockModel.Block
    S?: blockModel.Block
    Z?: blockModel.Block
  } = {
    I: {
      id: '',
      type: blockModel.BlockType.BLOCK_I,
      center: {
        index: 1,
        offsetX: 1,
        offsetY: 1
      },
      blockBoard: new Array(4).fill(0).map(() => {
        return [0, 1, 0, 0]
      }),
      blockData: {
        angle: blockModel.BlockAngle.ANGLE_0,
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
    },
    O: {
      id: '',
      type: blockModel.BlockType.BLOCK_O,
      center: {
        index: 0,
        offsetX: 0,
        offsetY: 0
      },
      blockBoard: new Array(2).fill(new Array(2).fill(1)),
      blockData: {
        angle: blockModel.BlockAngle.ANGLE_0,
        position: [
          {
            x: 4,
            y: -1
          },
          {
            x: 5,
            y: -1
          },
          {
            x: 4,
            y: 0
          },
          {
            x: 5,
            y: 0
          }
        ]
      }
    },
    J: {
      id: '',
      type: blockModel.BlockType.BLOCK_J,
      center: {
        index: 2,
        offsetX: 1,
        offsetY: 2
      },
      blockBoard: new Array(2).fill(0).map((item, index) => {
        if (index == 0) {
          return [0, 0, 1]
        }
        return [1, 1, 1]
      }),
      blockData: {
        angle: blockModel.BlockAngle.ANGLE_0,
        position: [
          {
            x: 4,
            y: 2
          },
          {
            x: 5,
            y: 2
          },
          {
            x: 5,
            y: 1
          },
          {
            x: 5,
            y: 0
          }
        ]
      }
    }
  }
  const defaultBlockBox: blockModel.BlockBox = {
    bottomHeight: new Array(config.value.containerSize.width).fill(0).map(() => config.value.containerSize.height - 1),
    blockPositions: new Array(config.value.containerSize.width)
      .fill(0)
      .map(() => new Array(config.value.containerSize.height).fill(0)),
    blockList: []
  }

  const currentBlock = ref<blockModel.Block>(cloneDeep(defaultBlock.J))
  const currentBlockBox = ref<blockModel.BlockBox>(cloneDeep(defaultBlockBox))
  const timmer = ref<NodeJS.Timer>()

  const initBlockBoard = (type: blockModel.BlockType) => {
    //初始化方块
    switch (type) {
      case blockModel.BlockType.BLOCK_I:
        return cloneDeep(defaultBlock.I)
      case blockModel.BlockType.BLOCK_O:
        return cloneDeep(defaultBlock.O)
      case blockModel.BlockType.BLOCK_J:
        return cloneDeep(defaultBlock.J)
      case blockModel.BlockType.BLOCK_L:
        return cloneDeep(defaultBlock.L)
      case blockModel.BlockType.BLOCK_S:
        return cloneDeep(defaultBlock.S)
      case blockModel.BlockType.BLOCK_Z:
        return cloneDeep(defaultBlock.Z)
      case blockModel.BlockType.BLOCK_T:
        return cloneDeep(defaultBlock.T)
    }
  }

  const rotateBlock = (block: blockModel.Block = currentBlock.value) => {
    //顺时针旋转
    const { position } = block.blockData
    const centerIndex = block.center.index
    const { width } = config.value.containerSize

    let newAngle: blockModel.BlockAngle = block.blockData.angle

    if (newAngle === 270) {
      newAngle = 0
    } else {
      newAngle += 90
    }

    //旋转方块
    switch (block.type) {
      case blockModel.BlockType.BLOCK_I:
        if (newAngle == blockModel.BlockAngle.ANGLE_0 || newAngle == blockModel.BlockAngle.ANGLE_180) {
          const newPostion = [
            {
              x: position[centerIndex].x - 1,
              y: position[centerIndex].y
            },
            {
              x: position[centerIndex].x,
              y: position[centerIndex].y
            },
            {
              x: position[centerIndex].x + 1,
              y: position[centerIndex].y
            },
            {
              x: position[centerIndex].x + 2,
              y: position[centerIndex].y
            }
          ]
          if (
            newPostion.some((offset) => {
              return offset.x < 0 || offset.x >= width || currentBlockBox.value.blockPositions[offset.x][offset.y] === 1
            })
          )
            return false
          block.blockBoard = new Array(4).fill(new Array(4).fill(0))
          block.blockBoard.forEach((item) => (item[1] = 1))
          block.blockData.position = newPostion
        } else if (newAngle == blockModel.BlockAngle.ANGLE_90 || newAngle == blockModel.BlockAngle.ANGLE_270) {
          const newPostion = [
            {
              x: position[centerIndex].x,
              y: position[centerIndex].y - 1
            },
            {
              x: position[centerIndex].x,
              y: position[centerIndex].y
            },
            {
              x: position[centerIndex].x,
              y: position[centerIndex].y + 1
            },
            {
              x: position[centerIndex].x,
              y: position[centerIndex].y + 2
            }
          ]
          if (
            newPostion.some((offset) => {
              return currentBlockBox.value.blockPositions[offset.x][offset.y] === 1
            })
          )
            return false
          block.blockBoard = new Array(4).fill(new Array(4).fill(0))
          block.blockBoard[1] = [1, 1, 1, 1]
          block.blockData.position = newPostion
        }
        break
      case blockModel.BlockType.BLOCK_O:
        break
    }
    block.blockData.angle = newAngle as blockModel.BlockAngle
  }

  const moveBlock = (
    action: blockModel.MoveType = blockModel.MoveType.CUSTOME,
    block: blockModel.Block = currentBlock.value
  ) => {
    //移动方块
    if (boundaryCheck(action, block)) return
    const { position } = block.blockData
    let newPosition: blockModel.Block['blockData']['position'] = []
    switch (action) {
      case blockModel.MoveType.CUSTOME:
        newPosition = position.map((offset) => {
          return {
            x: offset.x,
            y: offset.y + 1
          }
        })
        break
      case blockModel.MoveType.LEFT:
        newPosition = position.map((offset) => {
          return {
            x: offset.x - 1,
            y: offset.y
          }
        })
        break
      case blockModel.MoveType.RIGHT:
        newPosition = position.map((offset) => {
          return {
            x: offset.x + 1,
            y: offset.y
          }
        })
        break
    }
    if (
      newPosition.every((offset) => {
        return currentBlockBox.value.blockPositions[offset.x][offset.y] !== 1
      })
    ) {
      block.blockData.position = newPosition
    } else if (action === blockModel.MoveType.CUSTOME) {
      blockReachBottom(block)
    }
  }

  const randomGennerateBlock = () => {
    //TODO 这里用随机
    // const randomArr = [blockModel.BlockType.BLOCK_I, blockModel.BlockType.BLOCK_O]
    // const type = randomArr[Math.floor(Math.random() * randomArr.length)]
    const type = blockModel.BlockType.BLOCK_J
    const block = initBlockBoard(type) || cloneDeep(defaultBlock.I)
    block.id = uuidv4()
    currentBlock.value = block
    currentBlockBox.value.blockList.push(block)
  }

  const boundaryCheck = (
    action: blockModel.MoveType = blockModel.MoveType.CUSTOME,
    block: blockModel.Block = currentBlock.value
  ) => {
    //边界检测
    const { containerSize } = config.value
    const { position } = block.blockData
    switch (action) {
      case blockModel.MoveType.CUSTOME:
        const flag = position.some((offset) => {
          return offset.y >= containerSize.height - 1
        })
        if (flag) {
          blockReachBottom(block)
          return true
        }
        break
      case blockModel.MoveType.LEFT:
        return position.some((offset) => {
          return offset.x <= 0
        })
      case blockModel.MoveType.RIGHT:
        return position.some((offset) => {
          return offset.x >= containerSize.width - 1
        })
    }
  }

  const blockReachBottom = (block: blockModel.Block = currentBlock.value) => {
    //方块到达底部
    const { position } = block.blockData
    position.forEach((offset) => {
      currentBlockBox.value.blockPositions[offset.x][offset.y] = 1
      currentBlockBox.value.bottomHeight[offset.x] = Math.min(
        currentBlockBox.value.bottomHeight[offset.x],
        offset.y - 1
      )
    })
    block.blockBoard.fill(new Array(block.blockBoard[0].length).fill(0))
    randomGennerateBlock()
  }

  const startGame = () => {
    //开始游戏
    randomGennerateBlock()
    timmer.value = setInterval(() => {
      moveBlock(blockModel.MoveType.CUSTOME)
    }, 10000)
  }
  const endGame = () => {
    //结束游戏
    alert('游戏结束')
    // console.log('游戏结束')
    clearInterval(timmer.value)
  }

  const initGame = () => {
    currentBlock.value = cloneDeep(defaultBlock.I)
    currentBlockBox.value = cloneDeep(defaultBlockBox)
    clearInterval(timmer.value)
  }

  watch(currentBlockBox.value.bottomHeight, (list) => {
    if (!list || !currentBlock.value) return
    if (list.some((item) => item < 0)) {
      endGame()
    }
  })

  watch(
    () => currentBlockBox.value.blockPositions,
    (list) => {
      if (!list) return
      for (let i = 0; i < config.value.containerSize.height; i++) {
        let flag = true
        for (let j = 0; j < config.value.containerSize.width; j++) {
          if (list[j][i] == 0) {
            flag = false
          }
        }
        if (flag) {
          list.forEach((item) => {
            item.splice(i, 1)
            item.unshift(0)
          })
          return
        }
      }
    },
    {
      deep: true
    }
  )

  return {
    config,
    currentBlock,
    currentBlockBox,
    initBlockBoard,
    rotateBlock,
    moveBlock,
    randomGennerateBlock,
    startGame,
    endGame,
    initGame
  }
})
