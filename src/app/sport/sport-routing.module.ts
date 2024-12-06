import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveScoreComponent } from './live-score/live-score.component';
import { SportComponent } from './sport/sport.component';

const routes: Routes = [
  {path:'', component: SportComponent},
  {path:'score', component: LiveScoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportRoutingModule { }
