import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { SquareComponent } from './square.component';
import * as Chess from '../engine/ChessElements';
import { Game } from './game';
import { ArtificialPlayer } from './playerBase';
import { HumanPlayer } from './playerBase';

@Component({
    selector: 'game',
    styleUrls: ['./game.component.css'],
    templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

    @ViewChild('movelist') moveListScrollingContainer;

    private game: Game;
    private selectedSquareComponent: SquareComponent;
    public activePlayerProgress: number;

    constructor(private appRef: ApplicationRef) {
    }

    ngOnInit() {
        Chess.BoardResources.init();
        this.startNew();
    }

    public onSquareSelected(selectedSquare: SquareComponent) {
        this.game.onSquareSelected(selectedSquare);
    }

    public get occupiedSquares(): Chess.OccupiedSquare[] {
        if (!this.game.board) {
            return [];
        }
        return this.game.board.occupiedSquares;
    }

    public get moveHistory(): Chess.GameMove[] {
        return this.game.moveHistory;
    }

    public get boardSquares(): Chess.BoardSquare[] {
        const rawGrid = Chess.BoardResources.squaresGridUiLayout;
        return [].concat.apply([], rawGrid);
    }

    public startNew(): void {
        this.bindGame(GameComponent.createGame());
    }

    private static createGame(): Game {
        const whiteHumanPlayer = new HumanPlayer(Chess.Player.White);
        const whiteArtificialPlayer = new ArtificialPlayer(Chess.Player.White);
        const blackHumanPlayer = new HumanPlayer(Chess.Player.Black);
        const blackArtificialPlayer = new ArtificialPlayer(Chess.Player.Black);

        return Game.createStandardGame(whiteHumanPlayer, blackArtificialPlayer);
    }

    private bindGame(newGame: Game): void {

        if (this.game) {
            this.game.dispose();
        }

        this.game = newGame;

        this.activePlayerProgress = 0;

        this.game.movePlayed.subscribe(() => {
            // Scroll the move list to the bottom.
            this.moveListScrollingContainer.nativeElement.scrollTop = this.moveListScrollingContainer.nativeElement.scrollHeight;
            this.appRef.tick();
        });

        this.game.progressNotified.subscribe((progressPercentage: number) => {
            this.activePlayerProgress = progressPercentage;
            try {
                // Force a refresh of the progress bar.
                this.appRef.tick();
            } catch (ignoreThis) { }
        });

        this.game.resume();
    }
}
