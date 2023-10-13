export enum BlockType {
  LINE = 'line'
}

export enum BlockAngle {
  ANGLE_0 = 0,
  ANGLE_90 = 90,
  ANGLE_180 = 180,
  ANGLE_270 = 270
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
    angle: BlockAngle
    position: {
      x: number
      y: number
    }[]
  }
}

export interface BlockBox {
  bottomHeight: number[]
  blockPositions: number[][]
  blockList: Block[]
}

export enum MoveType {
  CUSTOM = 'custom',
  LEFT = 'left',
  RIGHT = 'right',
}
