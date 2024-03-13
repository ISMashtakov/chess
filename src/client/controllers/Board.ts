import GameStore from "../storages/GameStore";
import BoardView from "../views/BoardView";
import BaseController from "./BaseController";
import { ObservationEventType } from '../helpers/ArrayObservable';
import FigureStore from '../storages/FigureStore';
import Figure from "./Figure";

export default class Board extends BaseController<GameStore> {
    figures: Array<Figure> = []
    
    constructor(store: GameStore) {
        super(store, new BoardView(store));

        store.figures.get().forEach(this.createFigure)

        store.figures.subscribe(this, e => {
            if(e.type === ObservationEventType.ADD){
                this.createFigure(e.value)
            }
            // TODO: add REMOVE supprotion
        });
    }

    private createFigure(figureStore: FigureStore){
        const figure = new Figure(figureStore, this.store);
        this.figures.push(figure);
        this.view.addChild(figure.view);
    }
}