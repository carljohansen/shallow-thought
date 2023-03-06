import { Input, Output, EventEmitter, Injectable } from '@angular/core';
import { SquareComponent } from './square.component';
import * as Chess from '../engine/ChessElements';
import { ComputerPlayer } from '../engine/Evaluation';

@Injectable()
export abstract class PlayerBase {

    @Output() move: EventEmitter<Chess.GameMove> = new EventEmitter();
    @Output() progress: EventEmitter<number> = new EventEmitter();

    constructor(colour: Chess.Player) {
    }

    abstract activate(board: Chess.Board): void;
    abstract deactivate(): void;

    onSquareSelected(square: SquareComponent) {
        // default implementation does nothing.
    }

    dispose(): void {
        // default implementation does nothing.
    }
}

export class HumanPlayer extends PlayerBase {

    isActive: boolean;

    private selectedFromSquare: SquareComponent;

    constructor(colour: Chess.Player) {
        super(colour);
        this.isActive = false;
    }

    activate(board: Chess.Board): void {
        if (!this.isActive) {
            this.isActive = true;
        }
    }

    override onSquareSelected(square: SquareComponent) {
        if (!this.isActive) {
            return;
        }

        if (!this.selectedFromSquare) {
            // Nothing currently selected so we're choosing a source square.
            this.selectedFromSquare = square;
            this.selectedFromSquare.select();
            return;
        }

        if (this.selectedFromSquare.algebraicName === square.algebraicName) {
            // User is re-selecting the from square; we call that a cancellation.
            this.selectedFromSquare.deselect();
            this.selectedFromSquare = null;
            return;
        }

        // We have a move!
        const toSquare = square;
        this.move.emit({ fromSquare: this.selectedFromSquare.square, toSquare: toSquare.square });
    }

    public deactivate(): void {
        if (this.selectedFromSquare) {
            this.selectedFromSquare.deselect();
            this.selectedFromSquare = null;
        }
    }
}

export class ArtificialPlayer extends PlayerBase {

    private currentBoard: Chess.Board;
    private engineWorker: Worker;
    private playedMove: Chess.GameMove;

    constructor(colour: Chess.Player) {
        super(colour);
        this.engineWorker = undefined;
    }

    activate(board: Chess.Board): void {

        if (!this.engineWorker) {
            //this.engineWorker = new Worker("/engine.bundle.js");
            //this.engineWorker = new Worker(new URL('./engine.bundle.js', import.meta.url));
            this.engineWorker = new Worker(new URL('./artificialPlayerDispatch.ts', import.meta.url));
        }
        this.progress.emit(0);
        this.currentBoard = board;
        this.engineWorker.onmessage = this.onMoveDecision;
        this.engineWorker.postMessage(board);
    }

    public onMoveDecision = (e: MessageEvent) => {

        var matchProgress = (data: any) => {
            const myRegexp = /PROGRESS:(.+)/g;
            var match = myRegexp.exec(data);
            return match ? parseInt(match[1], 10) : null;
        };

        let progress: number;
        if ((progress = matchProgress(e.data)) !== null) {
            this.progress.emit(progress);
            return;
        }

        const chosenMoveAsObj = e.data;
        if (!chosenMoveAsObj) {
            // We are unable to move.  It's either mate or stalemate.
            this.move.emit(null);
        } else {
            this.playedMove = Chess.GameMove.deserialize(e.data);
            this.move.emit(this.playedMove);
        }
    }

    public deactivate(): void {
        this.currentBoard = null;
        this.playedMove = null;
    }

    public override dispose(): void {
        if (this.engineWorker) {
            this.engineWorker.terminate();
            this.engineWorker = undefined;
        }
    }
}