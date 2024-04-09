import Event from '../../general/helpers/Event'

/**
 * Аргументы события об изменении тумана войны
 */
interface onUpdateFogOfWarArgs {
  value: boolean[][]
  old: boolean[][]
}

/**
 * Класс для хранения состояния тумана войны
 * если matrix[x][y] === true -> клетка <x,y> закрыта для игрока
 */
export default class FogOfWarStore {
  matrix: boolean[][]
  readonly onUpdate = new Event<onUpdateFogOfWarArgs>()

  constructor () {
    this.matrix = this.getFullFog()
  }

  /**
     * Проверка валидности матрицы
     * @param matrix матрица для проверки
     * @returns true, если матрица валидная иначе false
     */
  isValidMatrix (matrix: boolean[][]): boolean {
    if (matrix.length !== 8) {
      return false
    }
    for (let i = 0; i < 8; i++) {
      if (matrix[i].length !== 8) {
        return false
      }
    }
    return true
  }

  /**
     * Установить новый туман войны
     * @param matrix новая матрица
     */
  setFog (matrix: boolean[][]) {
    if (!this.isValidMatrix(matrix)) {
      throw new Error('Неправильный размер матрицы')
    }

    const old = this.matrix
    this.matrix = matrix
    this.onUpdate.send({
      value: this.matrix,
      old
    })
  }

  /**
     * Проверка клетки на нахождение в тумане войны
     * @param x позиция х
     * @param y позиция у
     * @returns true, если клетка скрыта от игрока, иначе false
     */
  inFog (x: number, y: number) {
    return this.matrix[x][y]
  }

  /**
     * Возвращает полный туман
     * @returns Возвращает двумерный массив 8x8 заполненный true
     */
  getFullFog (): boolean[][] {
    const matrix: boolean[][] = []

    for (let i = 0; i < 8; i++) {
      matrix[i] = []
      for (let j = 0; j < 8; j++) {
        matrix[i][j] = true
      }
    }

    return matrix
  }
}
