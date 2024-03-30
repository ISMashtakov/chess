interface Subscribtion<T> {
  obj: object
  callback: (args: T) => void
}

/**
 * Событие
 * @template T аргументы события
 */
export default class Event<T> {
  subscribers: Array<Subscribtion<T>> = []

  /**
   * Подписка на событие
   * @param obj подписываемый объект
   * @param callback действия при событии
   */
  public subscribe (obj: object, callback: (args: T) => void) {
    this.subscribers.push({ obj, callback })
  }

  /**
   * Отписка от события
   * @param obj отписываемый объект
   */
  public unsubscribe (obj: object) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber.obj !== obj)
  }

  /**
   * Посылка сообщения подписчикам
   * @param args сообщение
   */
  public send (args: T) {
    this.subscribers.forEach(subscriber => { subscriber.callback(args) })
  }
}
