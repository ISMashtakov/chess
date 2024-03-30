/**
 * Класс для хранения позиции на поле или сдвига
 */
export default class Vector2 {
  public readonly x: number
  public readonly y: number

  constructor (x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  /**
   * Проверяет наличие клетки с данной позицией на поле
   * @returns true если такая клетка есть иначе false
   */
  isValid (): boolean {
    return this.x >= 0 && this.y >= 0 && this.x <= 7 && this.y <= 7
  }

  /**
   * Создаёт новый вектор с указанным сдвигом относительно текущего
   * @param x сдвиг по оси x
   * @param y сдвиг по оси y
   * @returns новый вектор сдвинутый на <x, y>
   */
  add (x: number, y: number): Vector2 {
    return new Vector2(this.x + x, this.y + y)
  }

  /**
   * Проверяет наличие данного вектора в массиве
   * @param ar массив для проверки
   * @returns true если вектор с такими же значениями есть в массиве, иначе false
   */
  in (ar: Vector2[]): boolean {
    return ar.find(v => this.equal(v)) !== undefined
  }

  /**
   * Проверяет равенство векторов
   * @param a вектор для сравнения
   * @returns true если вектора равны, иначе false
   */
  equal (a: Vector2): boolean {
    return this.x === a.x && this.y === a.y
  }

  /**
   * Приведение вектора к строке
   * @returns строковое представление вектора
   */
  toString (): string {
    return `(${this.x}, ${this.y})`
  }

  static UP (): Vector2 {
    return new Vector2(0, -1)
  }

  static DOWN (): Vector2 {
    return new Vector2(0, 1)
  }

  static RIGHT (): Vector2 {
    return new Vector2(1, 0)
  }

  static LEFT (): Vector2 {
    return new Vector2(-1, 0)
  }
}
