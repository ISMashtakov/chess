import type GameStore from '../storages/GameStore'
import BaseView from './BaseView'
import { BOARD_CELL_ZINDEX, CELL_SIZE } from '../helpers/constants'
import { Container } from 'pixi.js'
import Vector2 from '../../general/helpers/Vector2'
import getMoveChecker, { type Castling } from '../helpers/FiguresMoveChecker'
import type FigureView from './FigureView'
import Event from '../../general/helpers/Event'

interface OnClickToCellArgs {
  pos: Vector2
}

/**
 * Представление доски
 */
export default class BoardView extends BaseView<GameStore> {
  cellsContainer: Container | undefined
  onClickToCell = new Event<OnClickToCellArgs>()

  render () {
    this.cellsContainer = new Container()
    this.cellsContainer.zIndex = BOARD_CELL_ZINDEX

    const root = new Container()
    root.addChild(this.cellsContainer)
    root.x = window.innerWidth / 2 - 4 * CELL_SIZE
    root.y = window.innerHeight / 2 - 4 * CELL_SIZE

    return root
  }

  postrender (): void {
    this.store.selectedFigure.subscribe(this, () => { this.drawBoard() })
  }

  /**
   * Метод для отрисовки клеток доски
   */
  drawBoard () {
    this.cellsContainer?.removeChildren()

    const posibleMoves = this.getPosibleMoves()
    const posibleCastlings = this.getPosibleCastlings()

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let square = null
        const pos = new Vector2(i, j)
        if (pos.in(posibleMoves)) {
          square = this.getSpriteByName('hintCell')
        } else if (pos.in(posibleCastlings.map(castling => castling.posForKing))) {
          square = this.getSpriteByName('hintCastlingCell')
        } else {
          if ((i + j) % 2 === 0) {
            square = this.getSpriteByName('whiteCell')
          } else {
            square = this.getSpriteByName('blackCell')
          }
        }
        square.x = i * CELL_SIZE
        square.y = j * CELL_SIZE
        square.eventMode = 'static'
        square.onclick = () => { this.onClickToCell.send({ pos }) }
        this.cellsContainer?.addChild(square)
      }
    }
  }

  /**
   * Получение возможных ходов для выбранной фигуры
   * @returns абсолютные возможные позиции для фигуры
   */
  getPosibleMoves (): Vector2[] {
    const selectedFigure = this.store.selectedFigure.get()

    if (selectedFigure === null) {
      return []
    }

    const checker = getMoveChecker(this.store, selectedFigure)
    return checker.getPossibleMoves()
  }

  /**
   * Получение возможных рокировок для выбранной фигуры
   * @returns возможные рокировки для фигуры
   */
  getPosibleCastlings (): Castling[] {
    const selectedFigure = this.store.selectedFigure.get()

    if (selectedFigure === null) {
      return []
    }

    const checker = getMoveChecker(this.store, selectedFigure)
    return checker.getPossibleCastlings()
  }

  /**
   * Добавление фигуры на доску
   * @param figure представление фигуры
   */
  addFigure (figure: FigureView) {
    this.root.addChild(figure.root)
    figure.onClick.subscribe(this, () => { this.onClickToCell.send({ pos: figure.store.position.get() }) })
  }

  /**
   * Удаление фигуры с доски
   * @param figure представление фигуры
   */
  removeFigure (figure: FigureView) {
    figure.onClick.unsubscribe(this)
    this.root.removeChild(figure.root)
  }
}
