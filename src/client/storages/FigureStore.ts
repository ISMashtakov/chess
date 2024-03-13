import Vector2 from '../helpers/Vector2';
import { Observable } from '../helpers/Observable';
import { Color, FigureType } from '../helpers/enums';

export default class FigureStore {
    public type = new Observable<FigureType>(FigureType.PAWN);
    public color = new Observable<Color>(Color.WHITE);
    public position = new Observable<Vector2>(new Vector2(0, 0));
    public isSelected = new Observable<boolean>(false);

    constructor(type: FigureType, color: Color, position: Vector2) {
        this.type.set(type);
        this.color.set(color);
        this.position.set(position);
    }
}