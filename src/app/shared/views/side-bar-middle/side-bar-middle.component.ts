import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MainActionsService } from '../../services/main-actions.service';

@Component({
  selector: 'app-side-bar-middle',
  templateUrl: './side-bar-middle.component.html',
  styleUrls: ['./side-bar-middle.component.scss']
})
export class SideBarMiddleComponent implements OnInit {
  mode: string | undefined;
  constructor(private mainService: MainActionsService, private authSer: AuthService) {
    this.mainService.mode.subscribe(mode => { this.mode = mode })
  }

  ngOnInit(): void {
  }

  checkCheckBoxvalue(event: any) {
    switch (event.target.checked) {
      case true:
        this.mainService.mode.next('light')
        break;
      case false:
        this.mainService.mode.next('dark')
        break;
      default:
        break;
    }
  }

  logout(){
    localStorage.clear()
    this.authSer.token.next(undefined)

  }
}
