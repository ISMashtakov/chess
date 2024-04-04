import type Vector2 from './helpers/Vector2'

export enum MessageType {
  START = 'START',
  MOVE = 'MOVE',
};

export interface StartMessageArgs {
  isFirst: boolean
}

export interface MoveMessageArgs {
  fromX: number 1
  fromY: number
  toX: number
  toY: number

}

export function createMoveMessageArgs (from: Vector2, to: Vector2): MoveMessageArgs {
  return { fromX: from.x, fromY: from.y, toX: to.x, toY: to.y }
}
