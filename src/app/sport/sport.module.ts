import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportRoutingModule } from './sport-routing.module';
import { SportComponent } from './sport/sport.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LiveScoreComponent } from './live-score/live-score.component';

@NgModule({
  declarations: [
    SportComponent,
    LiveScoreComponent
  ],
  imports: [
    CommonModule,
    SportRoutingModule,
    FormsModule,
    SharedModule
  ],
})
export class SportModule { }
