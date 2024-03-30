import type FigureStore from '../storages/FigureStore'
import BaseController from './BaseController'
import FigureView from '../views/FigureView'
import type GameStore from '../storages/GameStore'

/**
 * Контроллер фигур на поле
 */
export default class Figure extends BaseController<FigureStore, FigureView> {
  gameStore: GameStore

  constructor (store: FigureStore, gameStore: GameStore) {
    super(store, new FigureView(store))
    this.gameStore = gameStore
    this.view.onClick.subscribe(this, () => { this.clickHandler() })
    this.store.position.subscribe(this, () => { this.moveHandler() }, false)
  }

  /**
   * Обработчик передвижения фигуры
   */
  moveHandler () {
    this.store.isMoved.set(true)
  }

  /**
   * Обработчик клика по фигуре
   */
  clickHandler (): void {
    if (this.store.color.get() === this.gameStore.myColor.get() && this.store.color.get() === this.gameStore.turn.get()) {
      this.gameStore.selectedFigure.set(this.store)
    }
  }
}
