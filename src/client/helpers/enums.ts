export enum FigureType {PAWN = 0}

export enum Color {BLACK = 10, WHITE}

export function enum2str(value: FigureType | Color): string {
    switch(value){
        case FigureType.PAWN:
            return "pawn";
        case Color.BLACK:
            return "black";
        case Color.WHITE:
            return "white";
    }
}