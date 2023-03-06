/// <reference lib="webworker" />

import 'reflect-metadata';
import { ComputerPlayer } from '../engine/Evaluation';
import * as Chess from '../engine/ChessElements';

onmessage = function (event) {

    Chess.BoardResources.init();

    // Marshall the Board object that we have been sent.
    var board: Chess.Board = Object.assign(new Chess.Board, event.data);

    // Prepare a player object that will calculate the next move and tell us about its progress.
    var computerPlayer = new ComputerPlayer();
    computerPlayer.calculationProgress.subscribe((progressPercentage: number) => {
        (<any>self).postMessage("PROGRESS:" + progressPercentage);
    });

    var selectedMove = computerPlayer.getBestMove(board);

    // Send our selected move back to the main thread.
    (<any>self).postMessage(selectedMove);
}
