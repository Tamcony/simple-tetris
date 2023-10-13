export enum BlockType {
  LINE = 'line'
}

export interface Block {
  id: string
  type: BlockType
  length: number
  center: {
    index: number
    offsetX: number
    offsetY: number
  }
  blockBoard: number[][]
  blockData: {
    angle: 0 | 90 | 180 | 270
    position: {
      x: number
      y: number
    }[]
  }
}

export enum MoveType {
  CUSTOM = 'custom',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom'
}
