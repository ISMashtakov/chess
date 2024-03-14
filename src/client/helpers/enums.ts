export enum FigureType {PAWN = 0, ROOK = 1, KNIGHT = 2, BISHOP = 3, QUEEN = 4, KING = 5}

export enum Color {BLACK = 10, WHITE = 11}

export function enum2str(value: FigureType | Color): string {
    switch(value){
        case FigureType.PAWN:
            return "pawn";
        case FigureType.ROOK:
            return "rook";
        case FigureType.KNIGHT:
            return "knight";
        case FigureType.BISHOP:
            return "bishop";
        case FigureType.QUEEN:
            return "queen";
        case FigureType.KING:
            return "king";
        case Color.BLACK:
            return "black";
        case Color.WHITE:
            return "white";
    }
}