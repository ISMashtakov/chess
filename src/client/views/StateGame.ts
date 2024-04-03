import type GameStore from '../storages/GameStore'
import BaseView from './BaseView'
import { Graphics, TextStyle, Text } from 'pixi.js'
import { Color } from '../helpers/enums'

export default class StateGame extends BaseView<GameStore> {
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
    menu.x = window.innerWidth - StateGame.WIDTH - StateGame.PADDING
    menu.y = window.innerHeight / 2 - StateGame.HEIGHT
    menu.roundRect(0, 0, StateGame.WIDTH, StateGame.HEIGHT, 5)
    menu.stroke({ width: 4, color: '#fff' })
    menu.fill('#1099bb')

    this.stateGame = new Text(this.getText(), style)
    this.stateGame.x = 5
    this.stateGame.y = 5
    menu.addChild(this.stateGame)
    return menu
  }

  changeStateGame () {
    if (this.stateGame) { this.stateGame.text = this.getText() }
  }

  getText () {
    return 'Ходят ' + (this.store.turn.get() === Color.WHITE ? 'белые' : 'черные')
  }

  postrender (): void {
    this.store.turn.subscribe(this, () => { this.changeStateGame() })
  }
}
