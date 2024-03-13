import { Assets, Container, Sprite } from "pixi.js"

export interface IBaseView {
    root: Container;
}

export default abstract class BaseView<T> implements IBaseView{
    static clickable: boolean = false;
    store: T;
    root: Container;

    constructor(store: T, ) {
        this.store = store;
        this.prerender()
        this.root = this.render();
        this.postrender()
    }

    abstract render(): Container;

    prerender(){}
    postrender(){}

    protected getSpriteByName(name: string): Sprite {
        return new Sprite(Assets.get(name));
    }

    protected makeClickable(): void {
        this.root.eventMode = 'static';
    }

    public set x(value: number) {
        this.root.x = value;
    }

    public set y(value: number) {
        this.root.y = value;
    }
    
    public addChild(child: IBaseView) {
        this.root.addChild(child.root);
    }
}