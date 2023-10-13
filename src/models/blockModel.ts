export enum BlockType {
  LINE = 'line'
}

export interface Block {
  id: string
  type: BlockType
  length: number
  blockBoard: number[][]
  blockData: {
    angle: 0 | 90 | 180 | 270
    position: {
      offsetX: number
      offsetY: number
    }[]
  }
}

export enum moveType {
  CUSTOM = 'custom',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom'
}
