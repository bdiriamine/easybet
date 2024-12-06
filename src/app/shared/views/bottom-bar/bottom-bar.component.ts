import { Component, OnInit } from '@angular/core';
import { MainActionsService } from '../../services/main-actions.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  linkActiv = 'home';
  constructor(private mainService: MainActionsService) { 
    
  }

  ngOnInit(): void {
    this.mainService.currentPath.subscribe(currentPath => { 
      this.linkActiv = currentPath 
    })

  }
  // goTo(name: string) {
  //   this.mainService.goTo(name)
  // }
}
