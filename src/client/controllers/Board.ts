import type GameStore from '../storages/GameStore'
import BoardView from '../views/BoardView'
import BaseController from './BaseController'
import { ObservationEventType } from '../../general/helpers/ArrayObservable'
import type FigureStore from '../storages/FigureStore'
import Figure from './Figure'
import type Vector2 from '../../general/helpers/Vector2'
import getMoveChecker from '../helpers/FiguresMoveChecker'
import type TurnHandler from './TurnHandler'

/**
 * Контроллер для доски
 */
export default class Board extends BaseController<GameStore, BoardView> {
  figures: Figure[] = []
  turnHandler: TurnHandler

  constructor (store: GameStore, turnHandler: TurnHandler) {
    super(store, new BoardView(store))
    this.turnHandler = turnHandler

    store.figures.get().forEach((i) => { this.createFigure(i) })

    store.figures.subscribe(this, e => {
      switch (e.type) {
        case ObservationEventType.ADD:
          this.createFigure(e.value)
          break
        case ObservationEventType.REMOVE:
          this.removeFigure(e.value)
          break
      }
    })

    this.view.onClickToCell.subscribe(this, (args) => { this.clickToCellHandler(args.pos) })
  }

  /**
   * Обработчик клика по клетке
   * @param pos позиция клетки
   */
  clickToCellHandler (pos: Vector2) {
    const selectedFigure = this.store.selectedFigure.get()
    if (!selectedFigure) {
      return
    }
    this.view.drawBoard()
    const moveChecker = getMoveChecker(this.store, selectedFigure)
    const possibleMoves = moveChecker.getPossibleMoves()
    const posibleCastlings = moveChecker.getPossibleCastlings()
    if (pos.in(possibleMoves)) {
      this.turnHandler.moveFigure(selectedFigure, pos)
      this.store.selectedFigure.set(null)
    } else {
      if (this.store.isFree(pos) || !this.store.withMy(pos)) {
        this.store.selectedFigure.set(null)
      }
    }
    const chosenCastling = posibleCastlings.find(castling => castling.posForKing.equal(pos))
    if (chosenCastling) {
      selectedFigure.position.set(pos)
      chosenCastling.rook.position.set(chosenCastling.posForRook)
    }
  }

  /**
   * Функция создания фигуры
   * @param figureStore состояние создаваемой фигуры
   */
  private createFigure (figureStore: FigureStore) {
    const figure = new Figure(figureStore, this.store)
    this.figures.push(figure)
    this.view.addFigure(figure.view)
  }

  /**
   * Функция удаления фигуры
   * @param figureStore состояние удаляемой фигуры
   */
  private removeFigure (figureStore: FigureStore) {
    const removableFigure = this.figures.find(figure => figure.store === figureStore)
    if (removableFigure) {
      this.figures.splice(this.figures.indexOf(removableFigure), 1)
      this.view.removeFigure(removableFigure.view)
    }
  }
}
