import FigureStore from "../storages/FigureStore";
import BaseView from "./BaseView";
import { enum2str } from "../helpers/enums";
import BoardView from "./BoardView";
import Vector2 from "../helpers/Vector2";


export default class FigureView extends BaseView<FigureStore> {
    boardView: BoardView | null = null;

    public render(){
        const name = enum2str(this.store.color.get()) + "_" + enum2str(this.store.type.get())
        const sprite = this.getSprite(name);
        this.addChild(sprite);
        this.moveTo(this.store.position.get());
    }

    public moveTo(position: Vector2){
        this.x = position.x * 100;
        this.y = position.y * 100;
    }
}
