import GameStore from "../storages/GameStore";
import BoardView from "../views/BoardView";
import BaseController from "./BaseController";
import { ObservationEventType } from '../helpers/ArrayObservable';
import FigureStore from '../storages/FigureStore';
import Figure from "./Figure";
import { FigureType } from "../helpers/enums";
import Pawn from "./Pawn";

const FIGURES_FACTORY : Record<FigureType, (s: FigureStore) => Figure> = {
    [FigureType.PAWN]: (s) => new Pawn(s),
}

export default class Board extends BaseController {
    gameStore: GameStore;
    figures: Array<Figure> = []
    
    constructor(gameStore: GameStore) {
        super(new BoardView(gameStore));
        this.gameStore = gameStore;

        gameStore.figures.get().forEach(this.createFigure)

        gameStore.figures.subscribe(this, e => {
            if(e.type === ObservationEventType.ADD){
                this.createFigure(e.value)
            }
            // TODO: add REMOVE supprotion
        });
    }

    private createFigure(figureStore: FigureStore){
        const figureFactory = FIGURES_FACTORY[figureStore.type.get()];
        const figure = figureFactory(figureStore);
        this.figures.push(figure);
        this.view.addChild(figure.view);
    }
}