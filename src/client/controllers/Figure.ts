import FigureStore from "../storages/FigureStore";
import BaseController from "./BaseController";
import FigureView from "../views/FigureView";
import GameStore from "../storages/GameStore";

export default class Figure extends BaseController<FigureStore, FigureView>{
    gameStore: GameStore;

    constructor(store: FigureStore, gameStore: GameStore) {
        super(store, new FigureView(store));
        this.gameStore = gameStore;
        this.view.onClick.subscribe(this, () => this.clickHandler())
        this.store.position.subscribe(this, () => this.moveHandler(), false)
    }

    moveHandler(){
        this.store.isMoved.set(true);
    }

    clickHandler(): void {
        if(this.store.color.get() === this.gameStore.myColor.get() && this.store.color.get() === this.gameStore.turn.get()){
            this.gameStore.selectedFigure.set(this.store);
        }
    }
}