import { Component, Input } from '@angular/core';
import * as Chess from '../engine/ChessElements';

interface MoveListRow {
    moveNumber: number;
    whiteMove: string;
    blackMove: string;
}

@Component({
    selector: 'move-list',
    styleUrls: ['./movelist.component.css'],
    templateUrl: "./movelist.component.html"
})
export class MoveListComponent {

    @Input() public moves: Chess.GameMove[];

    private moveListRowsInternal: MoveListRow[];
    private numMovesInInternalList: number;

    constructor() {
        this.moveListRowsInternal = [];
        this.numMovesInInternalList = 0;
    }

    public get moveListRows(): MoveListRow[] {
        if (!this.moves) {
            return this.moveListRowsInternal;
        }
        if (this.numMovesInInternalList > this.moves.length) {
            // Looks like our moves have been reset.
            this.moveListRowsInternal = [];
            this.numMovesInInternalList = 0;
        }

        while (this.numMovesInInternalList < this.moves.length) {
            const currMoveIndex = this.numMovesInInternalList;
            if (currMoveIndex % 2 === 0) {
                const newRow: MoveListRow = { moveNumber: (currMoveIndex / 2) + 1, whiteMove: Chess.GameMove.getNotation(this.moves[currMoveIndex]), blackMove: null };
                this.moveListRowsInternal.push(newRow);
            } else {
                const currRow = this.moveListRowsInternal[this.moveListRowsInternal.length - 1];
                currRow.blackMove = Chess.GameMove.getNotation(this.moves[currMoveIndex]);
            }
            this.numMovesInInternalList++;
        }
        return this.moveListRowsInternal;
    }
}
