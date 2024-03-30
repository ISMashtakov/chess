/**
 * Объект подписки на изменение
 * @template T тип поля
 */
export interface Subscribtion<T> {
  obj: object
  callback: (value: T, old: T) => void
}

/**
 * Создание наблюдаемого поля
 * @template T тип поля
 */
export class Observable<T> {
  private value: T
  private subscribers: Array<Subscribtion<T>> = []
  constructor (value: T) {
    this.value = value
  }

  /**
   * Получение значения поля
   * @returns значение поля
   */
  public get (): T {
    return this.value
  }

  /**
   * Изменение значения поля
   * @param value новое значение поля
   */
  public set (value: T) {
    const oldValue = this.value
    this.value = value

    this.subscribers.forEach(subscriber => {
      subscriber.callback(value, oldValue)
    })
  }

  /**
   * Подписка на событие изменения поля
   * @param obj подписываемый объект
   * @param callback действия при событии
   */
  public subscribe (obj: object, callback: (value: T, old: T) => void, notify: boolean = true) {
    this.subscribers.push({ obj, callback })
    if (notify) {
      callback(this.value, this.value)
    }
  }

  /**
   * Отписка от события изменения массива
   * @param obj отписываемый объект
   */
  public unsubscribe (obj: object) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber.obj !== obj)
  }
}
