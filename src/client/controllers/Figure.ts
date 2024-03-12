import FigureStore from "../storages/FigureStore";
import BaseController from "./BaseController";
import FigureView from "../views/FigureView";

export default class Figure extends BaseController{
    figureStore: FigureStore;
    constructor(store: FigureStore) {
        super(new FigureView(store));
        this.figureStore = store;
    }
}