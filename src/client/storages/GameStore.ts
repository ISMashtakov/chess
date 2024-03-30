import { ObservableArray } from '../../general/helpers/ArrayObservable'
import { Observable } from '../../general/helpers/Observable'
import type Vector2 from '../../general/helpers/Vector2'
import { Color } from '../helpers/enums'
import type FigureStore from './FigureStore'

/**
 * Класс для хранения информации о состоянии игры
 */
export default class GameStore {
  public figures = new ObservableArray<FigureStore>()
  public myColor = new Observable<Color | null>(null)
  public selectedFigure = new Observable<FigureStore | null>(null)
  public turn = new Observable<Color>(Color.WHITE)

  constructor () {
    this.selectedFigure.subscribe(this, (c, o) => { this.onChangeSelectedFigure(c, o) })
  }

  /**
   * Обработчик события изменения выделенной фигуры.
   * Нужен для копирования состояния в выбранную фигуру
   * @param current информация о текущей выбранной фигуре
   * @param old информация о фигуре, которая была выбрана до этого
   */
  public onChangeSelectedFigure (current: FigureStore | null, old: FigureStore | null) {
    old?.isSelected.set(false)
    current?.isSelected.set(true)
  }

  /**
   * Возвращает информацию о фигуре по её абсолютной позиции
   * @param pos абсолютная позиция фигуры
   * @returns фигуру или undefined если клетка пуста
   */
  public getFigureAt (pos: Vector2): FigureStore | undefined {
    return this.figures.get().find(fig => fig.position.get().equal(pos))
  }

  /**
   * Проверяет является ли игрок владельцем фигуры
   * @param figure информация о фигуре
   * @returns true если данная фигура икрока иначе false
   */
  isMy (figure: FigureStore): boolean {
    return figure.color.get() === this.myColor.get()
  }

  /**
   * Проверяет стоит ли на указанной абсолютной позиции фигура игрока
   * @param pos абсолютная позиция клетки
   * @returns true если на клетке стоит фигура игрока. Если фигуры нет или это вражеская фигура, то false.
   */
  withMy (pos: Vector2): boolean {
    const figure = this.getFigureAt(pos)

    return figure !== undefined && this.isMy(figure)
  }

  /**
   * Проверяет клетку на пустоту
   * @param pos абсолютная позиция клетки
   * @returns false если на клетке стоит фигура иначе true.
   */
  isFree (pos: Vector2): boolean {
    return this.getFigureAt(pos) === undefined
  }
}
