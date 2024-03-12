import { Assets, Container, Sprite } from "pixi.js"

export default abstract class BaseView<T> extends Container {
    store: T;
    constructor(store: T) {
        super();
        this.store = store;
        this.render();
    }

    protected getSprite(name: string): Sprite {
        return new Sprite(Assets.get(name));
    }

    abstract render(): void;
}