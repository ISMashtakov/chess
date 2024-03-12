import { Application } from 'pixi.js';
import loadAssets from './assets';
import Board from './controllers/Board';

(async () =>
{
    await loadAssets();
    
    const app = new Application();

    // Задний фон
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    // Создание доски
    const board = new Board();
    app.stage.addChild(board.view);
})();