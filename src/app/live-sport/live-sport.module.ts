import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveSportRoutingModule } from './live-sport-routing.module';
import { LiveSportComponent } from './live-sport/live-sport.component';


@NgModule({
  declarations: [
    LiveSportComponent
  ],
  imports: [
    CommonModule,
    LiveSportRoutingModule
  ]
})
export class LiveSportModule { }
