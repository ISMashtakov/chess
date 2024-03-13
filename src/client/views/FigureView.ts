import { Container, Sprite } from 'pixi.js';
import FigureStore from "../storages/FigureStore";
import BaseView from "./BaseView";
import { enum2str } from "../helpers/enums";
import Vector2 from "../helpers/Vector2";
import { CELL_SIZE } from "../helpers/constants";


export default class FigureView extends BaseView<FigureStore> {

    
    render(){
        const container = new Container();
        const sprite = this.getSprite();
        container.addChild(sprite);
        return container
    }

    getSprite(isSelected = false): Sprite {
        const name = `${enum2str(this.store.color.get())}_${enum2str(this.store.type.get())}${isSelected? "_selected" : ""}`
        return this.getSpriteByName(name);
    }

    postrender(): void {
        this.makeClickable();

        this.moveTo(this.store.position.get());
        this.store.isSelected.subscribe(this, v => this.onChangeSelected(v));
    }

    moveTo(position: Vector2){
        this.x = position.x * CELL_SIZE;
        this.y = position.y * CELL_SIZE;
    }

    onChangeSelected(isSelected: boolean){
        this.root.removeChildren();
        this.root.addChild(this.getSprite(isSelected));
    }
    
}
