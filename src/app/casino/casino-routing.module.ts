import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasinoComponent } from './game/casino/casino.component';
import { FavoritComponent } from './game/favorit/favorit.component';
import { LiveCasinoComponent } from './game/live-casino/live-casino.component';
import { VirtualComponent } from './game/virtual/virtual.component';

const routes: Routes = [
  { path: 'casino', component: CasinoComponent },
  { path: 'live-casino', component: LiveCasinoComponent },
  { path: 'virtual', component: VirtualComponent },
  { path: 'favorit', component: FavoritComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasinoRoutingModule { }
