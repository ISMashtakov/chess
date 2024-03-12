import { Container } from "pixi.js";

export default class BaseController {
    view: Container;

    constructor(view: Container) {
        this.view = view;
    }
}