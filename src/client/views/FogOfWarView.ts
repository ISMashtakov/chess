import { Container } from 'pixi.js'
import type FogOfWarStore from '../storages/FogOfWarStore'
import BaseView from './BaseView'
import { CELL_SIZE, FOG_OF_WAR_ZINDEX } from '../helpers/constants'

export default class FogOfWarView extends BaseView<FogOfWarStore> {
  render (): Container {
    const container = new Container()
    container.zIndex = FOG_OF_WAR_ZINDEX

    return container
  }

  updateFogOfWar () {
    this.root.removeChildren()
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.store.inFog(i, j)) {
          const sprite = this.getSpriteByName('blackCell')
          sprite.x = i * CELL_SIZE
          sprite.y = j * CELL_SIZE
          sprite.alpha = 0.7
          sprite.zIndex = FOG_OF_WAR_ZINDEX
          this.root.addChild(sprite)
        }
      }
    }
  }

  postrender (): void {
    this.updateFogOfWar()
    this.store.onUpdate.subscribe(this, () => { this.updateFogOfWar() })
  }
}
