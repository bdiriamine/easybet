import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ThemeModeService } from 'src/app/core/services/theme-mode.service';
import { MainActionsService } from '../../services/main-actions.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class LeftBarComponent implements OnInit, OnDestroy {
  mode : boolean;
  @Input() opened: boolean | undefined
  navs = [
    {
      name: 'sidehome',
      opened: true
    },
    {
      name: 'sidemiddle',
      opened: false
    },
    {
      name: 'sideprofil',
      opened: false
    },
  ]
  element: HTMLElement | null;

  constructor(private mainService: MainActionsService, private modeThemeServ: ThemeModeService,
    private localStorageServ: LocalstorageService,) {
  }
 
  ngOnInit(): void {

    if (this.localStorageServ.getItem('mode') == undefined && this.localStorageServ.getItem('mode') == null) this.mode = true
    else {
      if(this.localStorageServ.getItem('mode') == 'dark') this.mode = true
      else this.mode = false
    }        
  }



  closeLeftBar() {
    this.element = document.getElementById('scrollnon')
    this.element!.style.overflowY = "auto"
    this.mainService.left_tab.next(false)
    this.navs.forEach(nav => {
       nav.name == 'sidehome' ? nav.opened = true : nav.opened = false
    });
  }


  open(name: string) {
    this.navs.forEach(nav => {
      name == nav.name ? nav.opened = true : nav.opened = false
    });
  }
  checkCheckBoxvalue(event: any) {
    if (event.target.checked) this.modeThemeServ.switchTheme('dark');
    else this.modeThemeServ.switchTheme('light');
  }

  ngOnDestroy(): void {
    this.mainService.mode.unsubscribe()
  }
}
