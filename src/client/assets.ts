import { Assets } from "pixi.js";

export default async function loadAssets(){
    await Assets.load([
        {
            alias: 'blackCell',
            src: 'assets/blackCell.png',
        },
        {
            alias: 'whiteCell',
            src: 'assets/whiteCell.png',
        },
    ])
};