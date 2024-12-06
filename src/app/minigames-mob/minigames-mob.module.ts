import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinigamesMobRoutingModule } from './minigames-mob-routing.module';
import { AviatorComponent } from './container/aviator/aviator.component';
import { ZeepComponent } from './container/zeep/zeep.component';
import { BalloonComponent } from './container/balloon/balloon.component';
import { MinigamesComponent } from './container/minigames/minigames.component';
import { LudoComponent } from './container/ludo/ludo.component';


@NgModule({
  declarations: [
    AviatorComponent,
    ZeepComponent,
    BalloonComponent,
    MinigamesComponent,
    LudoComponent
  ],
  imports: [
    CommonModule,
    MinigamesMobRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class MinigamesMobModule { }
