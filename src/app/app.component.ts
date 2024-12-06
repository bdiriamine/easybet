import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { ThemeModeService } from './core/services/theme-mode.service';
import { MainActionsService } from './shared/services/main-actions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalstorageService } from './core/services/localstorage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  right_tab: boolean | undefined
  left_tab: boolean | undefined
  collapsed = false
  mode: string | undefined;
  tk: any
  windowWidth: number;
  constructor(
    private mainService: MainActionsService,
    private jwthelper: JwtHelperService,
    private route: Router,
    private themeModeServ: ThemeModeService,
    private localstorageServ: LocalstorageService) {
    this.themeModeServ.initializeTheme();
    this.mainService.left_tab.subscribe((res: boolean) => { this.left_tab = res })
    this.mainService.right_tab.subscribe((res: boolean) => { this.right_tab = res })
    this.mainService.mode.subscribe(mode => { this.mode = mode })
  }

  ngOnInit(): void {
   this.windowWidth =  window.innerWidth;
    this.localstorageServ.storageSub.subscribe(res => {
      this.tk = localStorage.getItem('tkGameEsy')
    })

    if ((this.jwthelper.isTokenExpired(this.tk) && (this.tk != null))) {
      localStorage.clear();
      this.route.navigate(["/"]).then(() => { window.location.reload() })
    }
  }

  ngAfterViewInit(): void {
    // Licence script init 
    const script = document.createElement("script");
    script.innerHTML = `apg_b2d3445b_f54d_4ee8_a1b1_6cf883490cf7.init()`
    document.head.appendChild(script);
  }
}
