import { ObservableArray } from "../../general/helpers/ArrayObservable";
import { Observable } from "../../general/helpers/Observable";
import Vector2 from "../../general/helpers/Vector2";
import { Color } from "../helpers/enums";
import FigureStore from "./FigureStore";

export default class GameStore {
    public figures = new ObservableArray<FigureStore>();
    public myColor = new Observable<Color | null>(null);
    public selectedFigure = new Observable<FigureStore | null>(null);
    public turn = new Observable<Color>(Color.WHITE);

    constructor(){
        this.selectedFigure.subscribe(this, this.onChangeSelectedFigure);
    }

    public onChangeSelectedFigure(current: FigureStore | null, old: FigureStore | null) {
            old?.isSelected.set(false);
            current?.isSelected.set(true);
    }

    public getFigureAt(pos: Vector2): FigureStore | undefined {
        return this.figures.get().find(fig => fig.position.get().equal(pos));
    }

    isMy(figure: FigureStore): boolean {
        return figure.color.get() === this.myColor.get();
    }

    withMy(pos: Vector2): boolean {
        const figure = this.getFigureAt(pos)
        
        return figure !== undefined && this.isMy(figure);
    }

    isFree(pos: Vector2): boolean {
        return this.getFigureAt(pos) === undefined;
    }
}