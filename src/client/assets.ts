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
            alias: 'hintCell',
            src: 'assets/hintCell.png',
        },
        // PAWN
        {
            alias: 'white_pawn',
            src: 'assets/figures/whitePawn.png',
        },
        {
            alias: 'white_pawn_selected',
            src: 'assets/figures/whitePawnSelected.png',
        },
        {
            alias: 'black_pawn',
            src: 'assets/figures/blackPawn.png',
        },
        {
            alias: 'black_pawn_selected',
            src: 'assets/figures/blackPawnSelected.png',
        },
        // ROOK
        {
            alias: 'white_rook',
            src: 'assets/figures/whiteRook.png',
        },
        {
            alias: 'white_rook_selected',
            src: 'assets/figures/whiteRookSelected.png',
        },
        {
            alias: 'black_rook',
            src: 'assets/figures/blackRook.png',
        },
        {
            alias: 'black_rook_selected',
            src: 'assets/figures/blackRookSelected.png',
        },
    ])
}