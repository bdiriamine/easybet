import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './shared/views/maintenance/maintenance.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./casino/casino.module').then(m => m.CasinoModule)
  },
  {
    path: 'mini-games',
    loadChildren: () => import('./mini-games-web/mini-games-web.module').then(m => m.MiniGamesWebModule)
  },
  {
    path: 'prelive',
    loadChildren: () => import('./sport/sport.module').then(m => m.SportModule)
  },
  {
    path: 'Livebetting',
    loadChildren: () => import('./live-sport/live-sport.module').then(m => m.LiveSportModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'mini-games',
    loadChildren: () => import('./minigames-mob/minigames-mob.module').then(m => m.MinigamesMobModule)
  },
  { path: '**',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'maintenance',  component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
