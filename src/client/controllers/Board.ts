import BoardView from "../views/BoardView";
import BaseController from "./BaseController";

export default class Board extends BaseController {
    constructor(){
        super(new BoardView());
    }
}