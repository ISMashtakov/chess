import { Assets, Container, Sprite } from 'pixi.js';

export default class BoardView extends Container {
    static readonly CELL_SIZE = 100;

    constructor(){
        super();
        this.render();
    }

    public render(){
        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++) {
                let square = null;
                if ((i + j) % 2 === 0) {
                    square = new Sprite(Assets.get('whiteCell'));
                }
                else {
                    square = new Sprite(Assets.get('blackCell'));
                }
                square.x = i * BoardView.CELL_SIZE;
                square.y = j * BoardView.CELL_SIZE;
                this.addChild(square);
            }
        }
    }
}