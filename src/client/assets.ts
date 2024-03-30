import { Assets } from 'pixi.js'

/**
 * Загрзка ассетов
 */
export default async function loadAssets () {
  await Assets.load([
    {
      alias: 'blackCell',
      src: 'assets/blackCell.png'
    },
    {
      alias: 'whiteCell',
      src: 'assets/whiteCell.png'
    },
    {
      alias: 'hintCell',
      src: 'assets/hintCell.png'
    },
    {
      alias: 'hintCastlingCell',
      src: 'assets/hintCastlingCell.png'
    },
    // PAWN
    {
      alias: 'white_pawn',
      src: 'assets/figures/whitePawn.png'
    },
    {
      alias: 'white_pawn_selected',
      src: 'assets/figures/whitePawnSelected.png'
    },
    {
      alias: 'black_pawn',
      src: 'assets/figures/blackPawn.png'
    },
    {
      alias: 'black_pawn_selected',
      src: 'assets/figures/blackPawnSelected.png'
    },
    // ROOK
    {
      alias: 'white_rook',
      src: 'assets/figures/whiteRook.png'
    },
    {
      alias: 'white_rook_selected',
      src: 'assets/figures/whiteRookSelected.png'
    },
    {
      alias: 'black_rook',
      src: 'assets/figures/blackRook.png'
    },
    {
      alias: 'black_rook_selected',
      src: 'assets/figures/blackRookSelected.png'
    },
    // KNIGHT
    {
      alias: 'white_knight',
      src: 'assets/figures/whiteKnight.png'
    },
    {
      alias: 'white_knight_selected',
      src: 'assets/figures/whiteKnightSelected.png'
    },
    {
      alias: 'black_knight',
      src: 'assets/figures/blackKnight.png'
    },
    {
      alias: 'black_knight_selected',
      src: 'assets/figures/blackKnightSelected.png'
    },
    // BISHOP
    {
      alias: 'white_bishop',
      src: 'assets/figures/whiteBishop.png'
    },
    {
      alias: 'white_bishop_selected',
      src: 'assets/figures/whiteBishopSelected.png'
    },
    {
      alias: 'black_bishop',
      src: 'assets/figures/blackBishop.png'
    },
    {
      alias: 'black_bishop_selected',
      src: 'assets/figures/blackBishopSelected.png'
    },
    // QUEEN
    {
      alias: 'white_queen',
      src: 'assets/figures/whiteQueen.png'
    },
    {
      alias: 'white_queen_selected',
      src: 'assets/figures/whiteQueenSelected.png'
    },
    {
      alias: 'black_queen',
      src: 'assets/figures/blackQueen.png'
    },
    {
      alias: 'black_queen_selected',
      src: 'assets/figures/blackQueenSelected.png'
    },
    // KING
    {
      alias: 'white_king',
      src: 'assets/figures/whiteKing.png'
    },
    {
      alias: 'white_king_selected',
      src: 'assets/figures/whiteKingSelected.png'
    },
    {
      alias: 'black_king',
      src: 'assets/figures/blackKing.png'
    },
    {
      alias: 'black_king_selected',
      src: 'assets/figures/blackKingSelected.png'
    }
  ])
}
