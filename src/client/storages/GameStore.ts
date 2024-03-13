import { ObservableArray } from "../helpers/ArrayObservable";
import { Observable } from "../helpers/Observable";
import { Color } from "../helpers/enums";
import FigureStore from "./FigureStore";

export default class GameStore {
    public figures = new ObservableArray<FigureStore>();
    public myColor = new Observable<Color>(Color.WHITE);
    public selectedFigure = new Observable<FigureStore | null>(null);

    constructor(){
        this.selectedFigure.subscribe(this, this.onChangeSelectedFigure);
    }

    public onChangeSelectedFigure(current: FigureStore | null, old: FigureStore | null) {
            old?.isSelected.set(false);
            current?.isSelected.set(true);
    }
}