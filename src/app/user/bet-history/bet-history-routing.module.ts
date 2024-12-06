import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetHistoryComponent } from './bet-history.component';

const routes: Routes = [
  {path:'', component: BetHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetHistoryRoutingModule { }
