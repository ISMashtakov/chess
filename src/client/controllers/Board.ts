import GameStore from "../storages/GameStore";
import BoardView from "../views/BoardView";
import BaseController from "./BaseController";
import { ObservationEventType } from '../helpers/ArrayObservable';
import FigureStore from '../storages/FigureStore';
import Figure from './Figure';
import Vector2 from "../helpers/Vector2";
import getMoveChecker from "../helpers/FiguresMoveChecker";

export default class Board extends BaseController<GameStore, BoardView> {
    figures: Array<Figure> = []
    
    constructor(store: GameStore) {
        super(store, new BoardView(store));

        store.figures.get().forEach(this.createFigure)

        store.figures.subscribe(this, e => {
            switch(e.type){
                case ObservationEventType.ADD:
                    this.createFigure(e.value)
                    break;
                case ObservationEventType.REMOVE:
                    this.removeFigure(e.value)
                    break;
            }
        });

        this.view.onClickToCell.subscribe(this, (args) => this.clickToCellHandler(args.pos));
    }

    clickToCellHandler(pos: Vector2){
        const selectedFigure = this.store.selectedFigure.get();
        if(!selectedFigure){
            return;
        }

        this.view.drawBoard();

        const moveChecker = getMoveChecker(this.store, selectedFigure);
        
        const possibleMoves = moveChecker.getPossibleMoves();
        const posibleCastlings = moveChecker.getPossibleCastlings();
        
        if (pos.in(possibleMoves)) {
            if (!moveChecker.isFree(pos)){
                const figure = moveChecker.getFigureAt(pos);
                if(figure && !moveChecker.isMy(figure)){
                    this.store.figures.remove(figure);
                }
            }
            selectedFigure.position.set(pos);
            this.store.selectedFigure.set(null);
        }
        else{
            if (moveChecker.isFree(pos) || !moveChecker.withMy(pos)){
                this.store.selectedFigure.set(null);
            }
        }

        // const currentCastling = 

        if (pos.in(posibleCastlings.map(castling => castling.posForKing))){ {
            const figure = moveChecker.getFigureAt(pos);
            selectedFigure.position.set(pos);
            

        }

    }

    private createFigure(figureStore: FigureStore){
        const figure = new Figure(figureStore, this.store);
        this.figures.push(figure);
        this.view.addFigure(figure.view);
    }

    private removeFigure(figureStore: FigureStore){
        const removableFigure = this.figures.find(figure => figure.store === figureStore);
        if(removableFigure){
            this.figures.splice(this.figures.indexOf(removableFigure), 1);
            this.view.removeFigure(removableFigure.view);
        }
    }
}