import { Directive, Input, Output, HostBinding, HostListener, OnInit, EventEmitter } from '@angular/core';
import * as Chess from '../engine/ChessElements';

@Directive({
    selector: '[square]',
})
export class SquareComponent implements OnInit {

    @Input("square") public square: Chess.BoardSquare;

    public file: number;
    public rank: number;
    public isLightColour: boolean;
    public algebraicName: string;
    public isSelected: boolean;

    @Output() selected: EventEmitter<SquareComponent> = new EventEmitter();

    constructor() {
        this.isSelected = false;
    }

    ngOnInit() {
        this.file = this.square.file;
        this.rank = this.square.rank;
        this.isLightColour = ((this.rank - 1) * 8 + this.file + (this.rank % 2)) % 2 === 1;
        this.algebraicName = this.square.algebraicNotation;
    }

    @HostBinding('style.-ms-grid-row') get rowBinder() {
        return 9 - this.rank;
    }

    @HostBinding('style.-ms-grid-column') get colBinder() {
        return this.file;
    }

    @HostBinding('id') get idBinder() {
        return this.algebraicName;
    }

    @HostBinding('class') get classBinder() {
        let classes = "boardsquare";
        classes += (this.isLightColour ? " lightsquare" : " darksquare");
        if (this.isSelected) {
            classes += " selectedFromSquare";
        }
        return classes;
    }

    @HostListener('click') onclick() {
        this.selected.emit(this);
    };

    public select(): void {
        this.isSelected = true;
    }

    public deselect(): void {
        this.isSelected = false;
    }
}
