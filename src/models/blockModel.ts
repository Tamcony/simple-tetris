export enum BlockType {
  BLOCK_I = 'I',
  BLOCK_O = 'O',
  BLOCK_J = 'J',
  BLOCK_L = 'L',
  BLOCK_T = 'T',
  BLOCK_S = 'S',
  BLOCK_Z = 'Z'
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
  CUSTOME = 'custom',
  LEFT = 'left',
  RIGHT = 'right'
}
