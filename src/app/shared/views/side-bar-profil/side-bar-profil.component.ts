import { Component, OnInit } from '@angular/core';
import { MainActionsService } from '../../services/main-actions.service';

@Component({
  selector: 'app-side-bar-profil',
  templateUrl: './side-bar-profil.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class SideBarProfilComponent implements OnInit {

  constructor(private mainService: MainActionsService) { }

  ngOnInit(): void {
  }
close(){
  this.mainService.left_tab.next(false)
}


}
