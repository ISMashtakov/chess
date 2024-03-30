import type BaseView from '../views/BaseView'

/**
 * Базовый контроллер для всех объектов на сцене
 * @template S Стор (старайтесь брать минимально возможный стор)
 * @template V Представление
 */
export default abstract class BaseController<S, V extends BaseView<S>> {
  view: V
  store: S

  constructor (store: S, view: V) {
    this.store = store
    this.view = view
  }
}
