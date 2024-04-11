import type GameStore from '../storages/GameStore'
import BaseView from './BaseView'
import { Graphics, TextStyle, Text } from 'pixi.js'
import { Color } from '../helpers/enums'

/**
 * Представление состояния игры
 */
export default class StateGameView extends BaseView<GameStore> {
  stateGame: Text | undefined
  static WIDTH = 400
  static HEIGHT = 400
  static PADDING = 100

  render () {
    const style = new TextStyle({
      fill: '#81F499',
      fontFamily: 'Georgia',
      fontWeight: 'lighter'
    })

    const menu = new Graphics()
    menu.x = window.innerWidth - StateGameView.WIDTH - StateGameView.PADDING
    menu.y = window.innerHeight / 2 - StateGameView.HEIGHT
    menu.roundRect(0, 0, StateGameView.WIDTH, StateGameView.HEIGHT, 5)
    menu.stroke({ width: 4, color: '#fff' })
    menu.fill('#1099bb')

    this.stateGame = new Text({ text: this.getText(), style })
    this.stateGame.x = 5
    this.stateGame.y = 5
    menu.addChild(this.stateGame)
    return menu
  }

  /**
   * Обновление текста, указывающего кто сейчас ходит
   */
  changeStateGameView () {
    if (this.stateGame) { this.stateGame.text = this.getText() }
  }

  /**
   * Вывод текста, указывающего кто сейчас ходит
   */
  getText () {
    return 'Ходят ' + (this.store.turn.get() === Color.WHITE ? 'белые' : 'черные')
  }

  postrender (): void {
    this.store.turn.subscribe(this, () => { this.changeStateGameView() })
  }
}
