/**
 * Типы событий с массивом
 */
export enum ObservationEventType {
  ADD,
  REMOVE
}

/**
 * Информация о событии
 * @template T тип элементов массива
 */
export interface ObservationEvent<T> {
  readonly type: ObservationEventType
  readonly value: T
}

/**
 * Объект подписки на изменение массива
 * @template T тип элементов массива
 */
export interface ArraySubscribtion<T> {
  obj: object
  callback: (event: ObservationEvent<T>) => void
}

/**
 * Создание наблюдаемого массива
 * @template T тип элементов массива
 */
export class ObservableArray<T> {
  private value: T[] = []
  private subscribers: Array<ArraySubscribtion<T>> = []

  /**
   * Получение всего массива (!!!Изменения не будут отслеживаться)
   * @returns хранимый массив
   */
  public get (): T[] {
    return this.value
  }

  /**
   * Добавление элемента в массив
   * @param value новый элемент
   */
  public push (value: T) {
    this.value.push(value)
    this.subscribers.forEach(subscriber => {
      subscriber.callback({ type: ObservationEventType.ADD, value })
    })
  }

  /**
   * Удаление элемента из массива
   * @param value
   */
  public remove (value: T) {
    this.value = this.value.filter(item => item !== value)
    this.subscribers.forEach(subscriber => {
      subscriber.callback({ type: ObservationEventType.REMOVE, value })
    })
  }

  /**
   * Подписка на события изменений массива
   * @param obj подписываемый объект
   * @param callback действия при событии
   */
  public subscribe (obj: object, callback: (value: ObservationEvent<T>) => void) {
    this.subscribers.push({ obj, callback })
  }

  /**
   * Отписка от событий изменений массива
   * @param obj отписываемый объект
   */
  public unsubscribe (obj: object) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber.obj !== obj)
  }
}
