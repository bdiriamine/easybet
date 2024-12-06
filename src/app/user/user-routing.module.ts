import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditprofileComponent } from './containers/editprofile/editprofile.component';
import { TransfertHistoryComponent } from './containers/transfert-history/transfert-history.component';
import { UserhistoryComponent } from './containers/userhistory/userhistory.component';

const routes: Routes = [
  { path: 'profile', component: EditprofileComponent, canActivate: [AuthGuard] },
  { path: 'history/:name', component: UserhistoryComponent, canActivate: [AuthGuard] },
  { path: 'transfert', component: TransfertHistoryComponent, canActivate: [AuthGuard] },
  { 
    path: 'bet-history', canActivate: [AuthGuard],
    loadChildren: () => import('./bet-history/bet-history.module').then(m => m.BetHistoryModule)
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
