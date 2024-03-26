import FigureStore from '../storages/FigureStore';
import GameStore from '../storages/GameStore';
import Vector2 from './Vector2';
import { Color, FigureType } from './enums';

const ORTO_DIRECTIONS = [Vector2.UP(), Vector2.DOWN(), Vector2.RIGHT(), Vector2.LEFT()];
const DIA_DIRECTIONS = [new Vector2(1, 1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(-1, -1),];

export class Castling {
    posForKing: Vector2;
    posForRook: Vector2;
    rook: FigureStore;

    constructor(posForKing: Vector2, posForRook: Vector2, rook: FigureStore) {
        this.posForKing = posForKing;
        this.posForRook = posForRook;
        this.rook = rook;
    }
}

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
    getPossibleCastlings(): Castling[] {
        return [];
    }
}

class PawnMoveChecker extends MoveCheckerBase {
    public getPossibleMoves(): Vector2[] {
        // TODO: сделать не так некрасиво
        let possibleMoves: Vector2[] = [];
        const isWhite = this.figure.color.get() === Color.WHITE;
        const pos = this.figure.position.get()
        const dir = isWhite? Vector2.UP() : Vector2.DOWN();
        const yDirAttack = isWhite? -1 : 1;
        const nextFigureR = this.getFigureAt(pos.add(dir.x+1, dir.y))
        const nextFigureL = this.getFigureAt(pos.add(dir.x-1, dir.y))
        const nextFigureC1 = this.getFigureAt(pos.add(dir.x, dir.y))
        const nextFigureC2 = this.getFigureAt(pos.add(dir.x, dir.y + yDirAttack))

        if (nextFigureR && !this.isMy(nextFigureR))
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(new Vector2 (1, yDirAttack), 1));
        if (nextFigureL && !this.isMy(nextFigureL))
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(new Vector2 (-1, yDirAttack), 1));
        if (!nextFigureC1){
            possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir, 1));
            if (!nextFigureC2 && !this.figure.isMoved.get())
                possibleMoves = possibleMoves.concat(this.getPossibleMovesForDirection(dir, 2));
        }

        return possibleMoves;
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

class QueenMoveChecker extends MoveCheckerBase {
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

    public getPossibleCastlings(): Castling[] {
        const possibleCastlings: Castling[] = [];
        const pos = this.figure.position.get();
        const figureForCastlingR = this.getFigureAt(pos.add(3, 0));
        const figureForCastlingL = this.getFigureAt(pos.add(-4, 0));
        
        if (figureForCastlingR !== undefined){
            if (!this.figure.isMoved.get() && !figureForCastlingR.isMoved.get() && this.isFree(pos.add(2, 0)) && this.isFree(pos.add(1, 0))){
                possibleCastlings.push(new Castling(pos.add(2, 0), pos.add(1, 0), figureForCastlingR));
            }
        }

        if (figureForCastlingL !== undefined){
            if (!this.figure.isMoved.get() && !figureForCastlingL.isMoved.get() && this.isFree(pos.add(-3, 0)) && this.isFree(pos.add(-2, 0)) && this.isFree(pos.add(-1, 0))){
                possibleCastlings.push(new Castling(pos.add(-2, 0), pos.add(-1, 0), figureForCastlingL));
            }
        }

        return possibleCastlings;
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
            return new QueenMoveChecker(store, figure);
        case FigureType.KING:
            return new KingMoveChecker(store, figure);
    }
}