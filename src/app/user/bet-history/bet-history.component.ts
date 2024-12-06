import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {
  activeItem = '1'
  firstDateBet= new Subject();;
  endDateBet = new Subject();
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: any) {
    this.activeItem = tab
  }

  firstData(param:any){
    this.firstDateBet.next(param) 
  }
  EndDate(param:any){
    this.endDateBet.next(param) 
  }

}
