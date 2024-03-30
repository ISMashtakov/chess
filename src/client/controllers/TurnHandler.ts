import { MessageType, type MoveMessageArgs, type StartMessageArgs, createMoveMessageArgs } from '../../general/messages'
import Vector2 from '../../general/helpers/Vector2'
import { Color } from '../helpers/enums'
import type Network from '../network/Network'
import type FigureStore from '../storages/FigureStore'
import type GameStore from '../storages/GameStore'

/**
 * Менеджер ходов и передвижения фигур
 */
export default class TurnHandler {
  store: GameStore
  network: Network

  constructor (store: GameStore, network: Network) {
    this.store = store
    this.network = network

    this.network.socket.on(MessageType.START, (args: StartMessageArgs) => { this.onNetworkStart(args) })
    this.network.socket.on(MessageType.MOVE, (args: MoveMessageArgs) => { this.onNetwormMove(args) })
  }

  /**
   * Передвигает фигуру
   * @param figure Инормация о передвигаемой фигуре
   * @param to Новая позиция фигуры
   * @param [local] Являются ли изменения локальными.
   * Если local = false, то будет отправлен сигнал на сервер о сделанном ходе
   */
  moveFigure (figure: FigureStore, to: Vector2, local: boolean = false) {
    if (!this.store.isFree(to)) {
      const enemyFigure = this.store.getFigureAt(to)
      if (enemyFigure) {
        this.store.figures.remove(enemyFigure)
      }
    }
    if (!local) {
      this.network.socket.emit(MessageType.MOVE, createMoveMessageArgs(figure.position.get(), to))
    }
    figure.position.set(to)
    this.store.turn.set(this.store.turn.get() === Color.BLACK ? Color.WHITE : Color.BLACK)
  }

  /**
   * Обработчик сигнала с сервера о начале игры
   * @param args Данные события
   */
  onNetworkStart (args: StartMessageArgs) {
    this.store.myColor.set(args.isFirst ? Color.WHITE : Color.BLACK)
  }

  /**
   * Обработчик сигнала с сервера о сделанном ходе
   * @param args Данные события
   */
  onNetwormMove (args: MoveMessageArgs) {
    const from = new Vector2(args.fromX, args.fromY)
    const to = new Vector2(args.toX, args.toY)

    const figure = this.store.getFigureAt(from)
    if (figure) {
      this.moveFigure(figure, to, true)
    } else {
      throw new Error(`Не найдена фигура на позиции ${from.toString()}`)
    }
  }
}
