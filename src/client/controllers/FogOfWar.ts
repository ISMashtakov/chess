import type FogOfWarStore from '../storages/FogOfWarStore'
import type GameStore from '../storages/GameStore'
import FogOfWarView from '../views/FogOfWarView'
import BaseController from './BaseController'

/**
 * Контроллер тумана войны
 */
export default class FogOfWar extends BaseController<FogOfWarStore, FogOfWarView> {
  gameStore: GameStore

  constructor (gameStore: GameStore) {
    super(gameStore.fogOfWarStore, new FogOfWarView(gameStore.fogOfWarStore))
    this.gameStore = gameStore

    this.gameStore.turn.subscribe(this, () => { this.updateFogOfWar() })
  }

  /**
     * Обновляет туман войны
     * Делаем видимость в одну клетку вокруг каждой фигуры
     */
  updateFogOfWar () {
    const newFog = this.store.getFullFog()

    this.gameStore.figures.get()
      .filter(figure => this.gameStore.isMy(figure))
      .forEach(figure => {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const position = figure.position.get().add(i, j)
            if (position.isValid()) {
              newFog[position.x][position.y] = false
            }
          }
        }
      })

    this.store.setFog(newFog)
  }
}
