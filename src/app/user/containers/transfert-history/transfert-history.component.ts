import { Component, OnInit } from '@angular/core';
import { Deposit } from '../../interfaces/deposit';
import { Withdraw } from '../../interfaces/withdraw';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-transfert-history',
  templateUrl: './transfert-history.component.html',
  styleUrls: ['./transfert-history.component.scss']
})
export class TransfertHistoryComponent implements OnInit {
  deposits: Deposit[];
  withdraws: Withdraw[];
  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.getTransfertList()
  }

  getTransfertList() {
    this.userServ.getTransfertList().then(
      (res: any) => {
        this.deposits = res.data.Deposit;
        this.withdraws = res.data.Withdraw;
      },
      err => {
        console.log(err);
      }
    )
  }
}
