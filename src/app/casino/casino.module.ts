import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasinoRoutingModule } from './casino-routing.module';
import { FilterComponent } from './views/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { ListeProviersComponent } from './views/liste-proviers/liste-proviers.component';
import { GameComponent } from './views/game/game.component';
import { CasinoComponent } from './game/casino/casino.component';
import { SharedModule } from '../shared/shared.module';
import { ListGamesComponent } from './views/list-games/list-games.component';
import { LiveCasinoComponent } from './game/live-casino/live-casino.component';
import { VirtualComponent } from './game/virtual/virtual.component';
import { FavoritComponent } from './game/favorit/favorit.component';
import { ModalProvidersComponent } from './views/modal-providers/modal-providers.component';


@NgModule({
  declarations: [
    FilterComponent,
    ListeProviersComponent,
    GameComponent,
    CasinoComponent,
    ListGamesComponent,
    LiveCasinoComponent,
    VirtualComponent,
    FavoritComponent,
    ModalProvidersComponent
  ],
  imports: [
    CommonModule,
    CasinoRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CasinoModule { }
