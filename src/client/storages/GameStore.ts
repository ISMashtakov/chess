import { ObservableArray } from "../helpers/ArrayObservable";
import FigureStore from "./FigureStore";

export default class GameStore {
    public figures = new ObservableArray<FigureStore>();
}