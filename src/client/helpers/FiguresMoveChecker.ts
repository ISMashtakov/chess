import FigureStore from '../storages/FigureStore';
import GameStore from '../storages/GameStore';
import Vector2 from './Vector2';
import { Color, FigureType } from './enums';

abstract class MoveCheckerBase {
    store: GameStore;
    figure: FigureStore;

    constructor(store: GameStore, figure: FigureStore) {
        this.store = store;
        this.figure = figure;
    }

    isMy(figure: FigureStore): boolean {
        return figure.color.get() === this.store.myColor.get();
    }

    withMy(pos: Vector2): boolean {
        const figure = this.getFigureAt(pos)
        
        return figure !== undefined && this.isMy(figure);
    }

    getFigureAt(pos: Vector2): FigureStore | undefined {
        return this.store.figures.get().find(fig => fig.position.get().equal(pos));
    }

    isFree(pos: Vector2): boolean {
        return this.getFigureAt(pos) === undefined;
    }
    abstract getPossibleMoves(): Vector2[];

    getPossibleMovesForDirection(dir: Vector2): Vector2[] {
        const possibleMoves: Vector2[] = [];
        const pos = this.figure.position.get();

        let next = pos.add(dir.x, dir.y);

        while(next.isValid()) {
            if (this.isFree(next)){
                possibleMoves.push(next);
            }
            else{
                if(!this.withMy(next)){
                    possibleMoves.push(next);
                }
                break;
            }
            next = next.add(dir.x, dir.y);
        }

        return possibleMoves;
    }
}

class PawnMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        const possibleMoves: Vector2[] = [];
        const pos = this.figure.position.get();
        const isWhite = this.figure.color.get() === Color.WHITE;
        
        const next = pos.add(0, isWhite? -1: 1);
        if (next.isValid()) {
            if (this.isFree(next)){
                possibleMoves.push(next);
                const next2 = next.add(0, isWhite? -1: 1);
                if (next2.isValid() && (this.isFree(next2) || !this.withMy(next))){
                        possibleMoves.push(next2);
                }
            }
            else if(!this.withMy(next)) {
                possibleMoves.push(next);
            }
        }

        return possibleMoves;
    }
}

class RookMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        let possibleMoves: Vector2[] = [];

        const directions = [new Vector2(0, 1), new Vector2(0, -1), new Vector2(1, 0), new Vector2(-1, 0)];
        
        directions.forEach(dir => {
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir));
        })

        return possibleMoves;
    }
}


export default function getMoveChecker(store: GameStore, figure: FigureStore): MoveCheckerBase {
    switch (figure.type.get()) {
        case FigureType.PAWN:
            return new PawnMoveChecker(store, figure);
        case FigureType.ROOK:
            return new RookMoveChecker(store, figure);
        default:
            // TODO delete it
            return new PawnMoveChecker(store, figure);
    }
}