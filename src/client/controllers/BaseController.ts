import BaseView from "../views/BaseView";

export default class BaseController<S, V extends BaseView<S>> {
    view: V;
    store: S;

    constructor(store: S, view:V) {
        this.store = store;
        this.view = view;
    }
}