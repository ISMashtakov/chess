import { Application } from 'pixi.js';
import loadAssets from './assets';
import Board from './controllers/Board';
import GameStore from './storages/GameStore';
import FigureStore from './storages/FigureStore';
import { Color, FigureType } from './helpers/enums';
import Vector2 from './helpers/Vector2';

(async () =>
{
    await loadAssets();
    
    const app = new Application();

    // Задний фон
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    //Создание стора
    const gameStore = new GameStore();
    
    // Создание доски
    const board = new Board(gameStore);
    app.stage.addChild(board.view.root);

    //Создание фигур
    const pawn = new FigureStore(FigureType.PAWN, Color.WHITE, new Vector2(2, 2));
    gameStore.figures.push(pawn);
    const pawn2 = new FigureStore(FigureType.PAWN, Color.WHITE, new Vector2(2, 3));
    gameStore.figures.push(pawn2);
})();