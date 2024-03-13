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
    }

    clickHandler(): void {
        if(this.store.color.get() === this.gameStore.myColor.get()){
            this.gameStore.selectedFigure.set(this.store);
        }
    }
   
}