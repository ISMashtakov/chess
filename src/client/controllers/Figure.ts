import type FigureStore from '../storages/FigureStore'
import BaseController from './BaseController'
import FigureView from '../views/FigureView'
import type GameStore from '../storages/GameStore'
import type Vector2 from '../../general/helpers/Vector2'

/**
 * Контроллер фигур на поле
 */
export default class Figure extends BaseController<FigureStore, FigureView> {
  gameStore: GameStore

  constructor (store: FigureStore, gameStore: GameStore) {
    super(store, new FigureView(store))
    this.gameStore = gameStore
    this.view.onClick.subscribe(this, () => { this.clickHandler() })
    this.store.position.subscribe(this, (value, old) => { this.moveHandler(value, old) }, false)
  }

  /**
   * Обработчик передвижения фигуры
   * @param value новая позиция
   * @param old старая позиция
   */
  moveHandler (value: Vector2, old: Vector2): void {
    this.store.isMoved.set(true)

    if (this.gameStore.isMy(this.store)) {
      this.store.lastVisiblePosition.set(value)
      this.udpateEnemyFiguresVisiblePositionAfterMyTurn()
    } else {
      this.updateVisiblePositionAfterEnemyTurn(value, old)
    }
  }

  /**
   * Обновляет видимость этой фигуры после вражеского хода
   * @param value новая позиция
   * @param old старая позиция
   */
  updateVisiblePositionAfterEnemyTurn (value: Vector2, old: Vector2) {
    const valueInFog = this.gameStore.fogOfWarStore.inFog(value.x, value.y)
    const oldInFog = this.gameStore.fogOfWarStore.inFog(old.x, old.y)

    // Если новая позиция вне тумана, то двигаем представление
    if (!valueInFog) {
      this.store.lastVisiblePosition.set(value)
    } else if (!oldInFog) {
      // Если старая позиция была не в тумане, то новая позиция для представления неизвестна.
      this.store.lastVisiblePosition.set(undefined)
      // Если перемещенеие полностью в тумане, то не двигаем представление
    }
  }

  /**
   * Обновляет видимость вражеских фигур после хода этой фигуры
   */
  udpateEnemyFiguresVisiblePositionAfterMyTurn () {
    const myPos = this.store.position.get()
    function isInVisibile (pos: Vector2): boolean {
      return myPos.x - 1 <= pos.x && myPos.x + 1 >= pos.x && myPos.y - 1 <= pos.y && myPos.y + 1 >= pos.y
    }

    // проверим поменялось ли отображение вражеских фигур
    this.gameStore.figures.get().filter(fig => !this.gameStore.isMy(fig)).forEach(fig => {
      const posNotInFog = isInVisibile(fig.position.get())
      // Если фигура рядом с нашей, то сдвигаем отображение
      if (posNotInFog) {
        fig.lastVisiblePosition.set(fig.position.get())
      } else {
        // Если прошлой позиции фигуры и не было, то ничего не изменилось
        const lastVisiblePosition = fig.lastVisiblePosition.get()
        if (lastVisiblePosition) {
          // Если мы проверили последнюю позицию фигуры и там её нет, то скрываем её
          if (isInVisibile(lastVisiblePosition)) {
            fig.lastVisiblePosition.set(undefined)
          }
        }
      }
    })
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
