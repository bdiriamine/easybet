import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiniGamesWebRoutingModule } from './mini-games-web-routing.module';
import { MiniGamesComponent } from './mini-games/mini-games.component';


@NgModule({
  declarations: [
    MiniGamesComponent
  ],
  imports: [
    CommonModule,
    MiniGamesWebRoutingModule
  ]
})
export class MiniGamesWebModule { }
