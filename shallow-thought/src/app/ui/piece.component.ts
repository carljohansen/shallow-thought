import { Component, Input } from '@angular/core';
import * as Chess from '../engine/ChessElements';

@Component({
    selector: 'piece',
    styleUrls: ['./piece.component.css'],
    template: `<img src="{{imgUrl}}" 
                class="piece"
                [style.left.px]="positionX" 
                [style.top.px]="positionY" />`
})
export class PieceComponent {

    @Input() public squarePiece: Chess.OccupiedSquare;

    constructor() {
    }

    private get boardSquareId(): string {
        if (this.squarePiece && this.squarePiece.square) {
            return this.squarePiece.square.algebraicNotation;
        }
        return "";
    }

    public get imgUrl(): string {
        const colour = (this.squarePiece.piece.player === Chess.Player.White) ? "l" : "d";
        let pieceCode: string;
        switch (this.squarePiece.piece.piece) {
            case Chess.PieceType.Pawn:
                pieceCode = "p";
                break;
            case Chess.PieceType.Knight:
                pieceCode = "n";
                break;
            case Chess.PieceType.Bishop:
                pieceCode = "b";
                break;
            case Chess.PieceType.Rook:
                pieceCode = "r";
                break;
            case Chess.PieceType.Queen:
                pieceCode = "q";
                break;
            case Chess.PieceType.King:
                pieceCode = "k";
                break;
        }
        return `assets/img/${pieceCode}${colour}.png`;
    }    

    private static squareSize = 60;

    public get positionX(): number {
        return (this.squarePiece.square.file - 1) * PieceComponent.squareSize;
    }

    public get positionY(): number {
        return (8 - this.squarePiece.square.rank) * PieceComponent.squareSize;
    }
}
