import { Assets, type Container, Sprite } from 'pixi.js'

export interface IBaseView {
  root: Container
}

/**
 * Базовый класс представлений на сцене
 * @template T тип хранилища (старайтесь выбирать наименее возможный тип)
 */
export default abstract class BaseView<T> implements IBaseView {
  static clickable: boolean = false
  store: T
  root: Container

  constructor (store: T) {
    this.store = store
    this.prerender()
    this.root = this.render()
    this.postrender()
  }

  /**
   * Создаёт представление для отрисовки на сцене
   * @returns представление для отрисовки
   */
  abstract render (): Container

  /**
   * Вызывается перед созданием представления
   */
  prerender () {}

  /**
   * Вызывается после созданием представления
   */
  postrender () {}

  /**
   * Получения спрайти из ассетов по её названию
   * @param name название спрайта
   * @returns экземпляр спрайта
   */
  protected getSpriteByName (name: string): Sprite {
    return new Sprite(Assets.get(name))
  }

  public set x (value: number) {
    this.root.x = value
  }

  public get x (): number {
    return this.root.x
  }

  public set y (value: number) {
    this.root.y = value
  }

  public get y (): number {
    return this.root.y
  }

  /**
   * Добавление дочернего представления
   * @param child экземпляр представления
   */
  public addChild (child: IBaseView) {
    this.root.addChild(child.root)
  }
}
