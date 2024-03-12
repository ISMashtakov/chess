import GameStore from '../storages/GameStore';
import BaseView from './BaseView';
import { CELL_SIZE } from '../helpers/constants';

export default class BoardView extends BaseView<GameStore> {

    public render(){
        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++) {
                let square = null;
                if ((i + j) % 2 === 0) {
                    square = this.getSprite('whiteCell');
                }
                else {
                    square = this.getSprite('blackCell');
                }
                square.x = i * CELL_SIZE;
                square.y = j * CELL_SIZE;
                this.addChild(square);
            }
        }
    }
}