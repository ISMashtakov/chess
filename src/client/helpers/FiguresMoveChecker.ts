import FigureStore from '../storages/FigureStore';
import GameStore from '../storages/GameStore';
import Vector2 from './Vector2';
import { Color, FigureType } from './enums';

const ORTO_DIRECTIONS = [Vector2.UP(), Vector2.DOWN(), Vector2.RIGHT(), Vector2.LEFT()];
const DIA_DIRECTIONS = [new Vector2(1, 1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(-1, -1),];

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

    getPossibleMovesForDirection(dir: Vector2, max_length: number = 10): Vector2[] {
        const possibleMoves: Vector2[] = [];
        const pos = this.figure.position.get();

        let next = pos.add(dir.x, dir.y);
        let lenght = 1;
        while(next.isValid() && lenght <= max_length) {
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
            lenght++;
        }

        return possibleMoves;
    }
}

class PawnMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        const isWhite = this.figure.color.get() === Color.WHITE;
        
        const dir = isWhite? Vector2.UP() : Vector2.DOWN();
        const length = this.figure.isMoved.get()? 1 : 2;

        return this.getPossibleMovesForDirection(dir, length);
    }
}

class RookMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        let possibleMoves: Vector2[] = [];
        
        ORTO_DIRECTIONS.forEach(dir => {
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir));
        })

        return possibleMoves;
    }
}

class KnightMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        const possibleMoves: Vector2[] = [];

        const pos = this.figure.position.get();

        const moves = [
            // вправо
            new Vector2(2, 1), new Vector2(2, -1), 
            // вниз
            new Vector2(-1, 2), new Vector2(1, 2),
            // влево
            new Vector2(-2, 1), new Vector2(-2, -1), 
            // вверх
            new Vector2(-1, -2), new Vector2(1, -2),
        ]
        
        moves.forEach(move => {
            const newPos = pos.add(move.x, move.y);
            if (newPos.isValid() && (this.isFree(newPos) || !this.withMy(newPos))) {
                possibleMoves.push(newPos);
            }
        })

        return possibleMoves;
    }
}

class BishopMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        let possibleMoves: Vector2[] = [];
        
        DIA_DIRECTIONS.forEach(dir => {
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir));
        })

        return possibleMoves;
    }
}

class QuuenMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        let possibleMoves: Vector2[] = [];
        
        DIA_DIRECTIONS.concat(ORTO_DIRECTIONS).forEach(dir => {
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir));
        })

        return possibleMoves;
    }
}

class KingMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        let possibleMoves: Vector2[] = [];
        
        DIA_DIRECTIONS.concat(ORTO_DIRECTIONS).forEach(dir => {
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir, 1));
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
        case FigureType.KNIGHT:
            return new KnightMoveChecker(store, figure);
        case FigureType.BISHOP:
            return new BishopMoveChecker(store, figure);
        case FigureType.QUEEN:
            return new QuuenMoveChecker(store, figure);
        case FigureType.KING:
            return new KingMoveChecker(store, figure);
    }
}