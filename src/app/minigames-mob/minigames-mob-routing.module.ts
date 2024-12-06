import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AviatorComponent } from './container/aviator/aviator.component';
import { BalloonComponent } from './container/balloon/balloon.component';
import { LudoComponent } from './container/ludo/ludo.component';
import { MinigamesComponent } from './container/minigames/minigames.component';
import { ZeepComponent } from './container/zeep/zeep.component';

const routes: Routes = [
  { path: 'dino', component: MinigamesComponent },
  { path: 'aviator', component: AviatorComponent },
  { path: 'zeppelin', component: ZeepComponent },
  { path: 'ludo', component: LudoComponent, canActivate: [AuthGuard] },
  { path: 'balloon', component: BalloonComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinigamesMobRoutingModule { }
