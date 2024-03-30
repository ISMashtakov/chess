import { Container } from 'pixi.js'
import type FigureStore from '../storages/FigureStore'
import BaseView from './BaseView'
import { enum2str } from '../helpers/enums'
import type Vector2 from '../../general/helpers/Vector2'
import { CELL_SIZE, FIGURE_ZINDEX } from '../helpers/constants'
import Event from '../../general/helpers/Event'

/**
 * Представление фигуры
 */
export default class FigureView extends BaseView<FigureStore> {
  public onClick = new Event()
  render () {
    const container = new Container()
    container.zIndex = FIGURE_ZINDEX

    return container
  }

  /**
   * Обновление спрайта фигуры взависимости от её цвета и выделенности
   */
  updateSprite () {
    this.root.removeChildren()

    const name = `${enum2str(this.store.color.get())}_${enum2str(this.store.type.get())}${this.store.isSelected.get() ? '_selected' : ''}`
    const sprite = this.getSpriteByName(name)

    this.root.addChild(sprite)
  }

  postrender (): void {
    this.root.eventMode = 'static'
    this.root.onclick = () => { this.onClick.send(undefined) }

    this.store.isSelected.subscribe(this, () => { this.updateSprite() })
    this.store.position.subscribe(this, e => { this.moveTo(e) })
  }

  /**
   * Передвигает фигуру на указанную клетку
   * @param position абсолютная позиция клетки
   */
  moveTo (position: Vector2) {
    this.x = position.x * CELL_SIZE
    this.y = position.y * CELL_SIZE
  }
}
