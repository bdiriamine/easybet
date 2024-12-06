import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SliderGamesComponent } from './views/slider-games/slider-games.component';
import { SliderGameComponent } from './views/slider-game/slider-game.component';
import { BoxWebComponent } from './views/box-web/box-web.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserSliderComponent } from './views/user-slider/user-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    HomeComponent,
    SliderGamesComponent,
    SliderGameComponent,
    BoxWebComponent,
    UserSliderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule
  ],
})
export class HomeModule { }
