import GameStore from '../storages/GameStore';
import BaseView from './BaseView';
import { CELL_SIZE } from '../helpers/constants';
import { Container } from 'pixi.js';

export default class BoardView extends BaseView<GameStore> {

    public render(){
        const root = new Container();
        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++) {
                let square = null;
                if ((i + j) % 2 === 0) {
                    square = this.getSpriteByName('whiteCell');
                }
                else {
                    square = this.getSpriteByName('blackCell');
                }
                square.x = i * CELL_SIZE;
                square.y = j * CELL_SIZE;
                root.addChild(square);
            }
        }

        root.x = window.innerWidth / 2 - 4 * CELL_SIZE;
        root.y = window.innerHeight / 2 - 4 * CELL_SIZE;

        return root;
    }
}