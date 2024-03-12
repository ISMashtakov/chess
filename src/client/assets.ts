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
        {
            alias: 'white_pawn',
            src: 'assets/figures/whitePawn.png',
        },
        {
            alias: 'black_pawn',
            src: 'assets/figures/blackPawn.png',
        },
    ])
};