import FigureStore from "../storages/FigureStore";
import BaseController from "./BaseController";
import FigureView from "../views/FigureView";
import GameStore from "../storages/GameStore";

export default class Figure extends BaseController<FigureStore>{
    gameStore: GameStore;

    constructor(store: FigureStore, gameStore: GameStore) {
        super(store, new FigureView(store));
        this.gameStore = gameStore;
    }

    onClick(): void {
        if(this.store.color.get() === this.gameStore.myColor.get()){
            this.gameStore.setSelectedFigure(this.store);
        }
    }
   
}