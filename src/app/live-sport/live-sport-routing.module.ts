import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveSportComponent } from './live-sport/live-sport.component';

const routes: Routes = [
  {path:'', component: LiveSportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveSportRoutingModule { }
