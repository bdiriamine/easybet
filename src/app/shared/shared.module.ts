import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { FooterComponent } from './views/footer/footer.component';
import { LeftBarComponent } from './views/left-bar/left-bar.component';
import { ConnectionButtonComponent } from './views/connection-button/connection-button.component';
import { BottomBarComponent } from './views/bottom-bar/bottom-bar.component';
import { LoaderComponent } from './views/loader/loader.component';
import { SideBarMiddleComponent } from './views/side-bar-middle/side-bar-middle.component';
import { SideBarProfilComponent } from './views/side-bar-profil/side-bar-profil.component';
import { TitlecasePipe } from './pipes/titlecase.pipe';
import { CouponSportComponent } from './views/coupon-sport/coupon-sport.component';
import { BoxSideNavComponent } from './views/box-side-nav/box-side-nav.component';
import { RightBarConnectedComponent } from './views/right-bar-connected/right-bar-connected.component';
import { WebProfileLinksComponent } from './web-profile-links/web-profile-links.component';
import { SliderImageComponent } from './views/slider-image/slider-image.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MaintenanceComponent } from './views/maintenance/maintenance.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    LeftBarComponent,
    ConnectionButtonComponent,
    BottomBarComponent,
    LoaderComponent,
    SideBarMiddleComponent,
    SideBarProfilComponent,
    TitlecasePipe,
    CouponSportComponent,
    BoxSideNavComponent,
    RightBarConnectedComponent,
    WebProfileLinksComponent,
    SliderImageComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    CarouselModule
  ],
  exports: [
    TitlecasePipe,
    NavBarComponent,
    BottomBarComponent,
    FooterComponent,
    ConnectionButtonComponent,
    LoaderComponent,
    LeftBarComponent,
    SliderImageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
