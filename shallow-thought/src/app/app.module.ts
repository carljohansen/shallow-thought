import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './ui/game.component';
import { PieceComponent } from './ui/piece.component';
import { SquareComponent } from './ui/square.component';
import { MoveListComponent } from './ui/movelist.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        PieceComponent,
        SquareComponent,
        MoveListComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
