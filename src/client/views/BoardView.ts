import GameStore from '../storages/GameStore';
import BaseView from './BaseView';
import { BOARD_CELL_ZINDEX, CELL_SIZE } from '../helpers/constants';
import { Container } from 'pixi.js';
import Vector2 from '../helpers/Vector2';
import getMoveChecker from '../helpers/FiguresMoveChecker';
import FigureView from './FigureView';
import Event from '../helpers/Event';

interface OnClickToCellArgs {
    pos: Vector2
}

export default class BoardView extends BaseView<GameStore> {

    cellsContainer: Container | undefined;
    onClickToCell = new Event<OnClickToCellArgs>();

    render(){       
        this.cellsContainer = new Container();
        this.cellsContainer.zIndex = BOARD_CELL_ZINDEX;

        const root = new Container();
        root.addChild(this.cellsContainer);
        root.x = window.innerWidth / 2 - 4 * CELL_SIZE;
        root.y = window.innerHeight / 2 - 4 * CELL_SIZE;

        return root;
    }

    postrender(): void {
        this.store.selectedFigure.subscribe(this, () => this.drawBoard());
    }

    drawBoard(){
        this.cellsContainer?.removeChildren();

        const hints = this.getHints();

        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++) {
                let square = null;
                const pos = new Vector2(i, j)
                if (pos.in(hints)) {
                    square = this.getSpriteByName('hintCell');
                }
                else{
                    if ((i + j) % 2 === 0) {
                        square = this.getSpriteByName('whiteCell');
                    }
                    else {
                        square = this.getSpriteByName('blackCell');
                    }
                }
                square.x = i * CELL_SIZE;
                square.y = j * CELL_SIZE;
                square.eventMode = 'static';
                square.onclick = () => this.onClickToCell.send({pos});
                this.cellsContainer?.addChild(square);
            }
        }
    }

    getHints(): Vector2[]{
        const selectedFigure = this.store.selectedFigure.get();

        if(selectedFigure === null){
            return []
        }
        
        const checker = getMoveChecker(this.store, selectedFigure);
        return checker.getPossibleMoves();        
    }

    addFigure(figure: FigureView){
        this.root.addChild(figure.root);
        figure.onClick.subscribe(this, () => this.onClickToCell.send({pos: figure.store.position.get()}));
    }

    removeFigure(figure: FigureView){
        figure.onClick.unsubscribe(this);
        this.root.removeChild(figure.root);
    }
}