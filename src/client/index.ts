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
    for(let i = 0; i < 8; i++){
        const pawn = new FigureStore(FigureType.PAWN, Color.BLACK, new Vector2(i, 1));
        gameStore.figures.push(pawn);
        const pawn2 = new FigureStore(FigureType.PAWN, Color.WHITE, new Vector2(i, 6));
        gameStore.figures.push(pawn2);
    }
    // Ладьи
    const rook1 = new FigureStore(FigureType.ROOK, Color.BLACK, new Vector2(0, 0));
    gameStore.figures.push(rook1);

    const rook2 = new FigureStore(FigureType.ROOK, Color.BLACK, new Vector2(7, 0));
    gameStore.figures.push(rook2);

    const rook3 = new FigureStore(FigureType.ROOK, Color.WHITE, new Vector2(0, 7));
    gameStore.figures.push(rook3);

    const rook4 = new FigureStore(FigureType.ROOK, Color.WHITE, new Vector2(7, 7));
    gameStore.figures.push(rook4);
    // Кони
    const knight1 = new FigureStore(FigureType.KNIGHT, Color.BLACK, new Vector2(1, 0));
    gameStore.figures.push(knight1);

    const knight2 = new FigureStore(FigureType.KNIGHT, Color.BLACK, new Vector2(6, 0));
    gameStore.figures.push(knight2);

    const knight3 = new FigureStore(FigureType.KNIGHT, Color.WHITE, new Vector2(1, 7));
    gameStore.figures.push(knight3);

    const knight4 = new FigureStore(FigureType.KNIGHT, Color.WHITE, new Vector2(6, 7));
    gameStore.figures.push(knight4);
    // Слоны
    const bishop1 = new FigureStore(FigureType.BISHOP, Color.BLACK, new Vector2(2, 0));
    gameStore.figures.push(bishop1);

    const bishop2 = new FigureStore(FigureType.BISHOP, Color.BLACK, new Vector2(5, 0));
    gameStore.figures.push(bishop2);

    const bishop3 = new FigureStore(FigureType.BISHOP, Color.WHITE, new Vector2(2, 7));
    gameStore.figures.push(bishop3);

    const bishop4 = new FigureStore(FigureType.BISHOP, Color.WHITE, new Vector2(5, 7));
    gameStore.figures.push(bishop4);
    
    // Королевы
    const queen1 = new FigureStore(FigureType.QUEEN, Color.BLACK, new Vector2(3, 0));
    gameStore.figures.push(queen1);

    const queen2 = new FigureStore(FigureType.QUEEN, Color.WHITE, new Vector2(3, 7));
    gameStore.figures.push(queen2);

    // Короли
    const king1 = new FigureStore(FigureType.KING, Color.BLACK, new Vector2(4, 0));
    gameStore.figures.push(king1);

    const king2 = new FigureStore(FigureType.KING, Color.WHITE, new Vector2(4, 7));
    gameStore.figures.push(king2);

})();