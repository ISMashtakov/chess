import { ObservableArray } from "../helpers/ArrayObservable";
import { Observable } from "../helpers/Observable";
import { Color } from "../helpers/enums";
import FigureStore from "./FigureStore";

export default class GameStore {
    public figures = new ObservableArray<FigureStore>();
    public myColor = new Observable<Color>(Color.WHITE);
    public selectedFigure = new Observable<FigureStore | null>(null);

    public setSelectedFigure(figure: FigureStore | null) {
        const current = this.selectedFigure.get();
        if (current) {
            current.isSelected.set(false);
        }
        
        if (figure){
            figure.isSelected.set(true);
        }
        
        this.selectedFigure.set(figure);
    }
}