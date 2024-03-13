import BaseView from "../views/BaseView";

export default class BaseController<K> {
    view: BaseView<K>;
    store: K;

    constructor(store: K, view: BaseView<K>) {
        this.store = store;
        this.view = view;
        this.view.root.onclick = () => this.onClick();
    }

    onClick() {}
}