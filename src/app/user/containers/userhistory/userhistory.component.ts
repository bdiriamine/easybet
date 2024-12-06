import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransfertHistory } from '../../interfaces/transfert-history';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.scss']
})
export class UserhistoryComponent implements OnInit {
  opened = true
  name: string;
  rows: string[];
  loadtable = true
  history: any
  active = 1;
  pagevide =true
  totalPages: number;
  page = 0;
  vide=true
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UserService) {
  }
  public hideRuleContent:boolean[] = [];
  public buttonName:any = 'x';
  
  toggle(index:number) {
    // toggle based on index
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

  ngOnInit(): void {
    this.getTransfertHistory()
    this.rows = ['Date','Game Name', 'Amount', 'Old Balance', 'New Balance', 'Type']
    this.name = this.route.snapshot.params.name;
  }

  goTo(name: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => { this.router.navigate(['user/history/' + name]) })
  }

  getTransfertHistory() {
    this.userServ.getCasinoTransactions(this.page).subscribe(
      (res: any) => {
      
        this.totalPages = res.data.totalPages * 10;
        this.history = res.data.items
        if(this.totalPages>0){
          this.vide = false
          this.pagevide= false
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getHistoryByPage(page: number) {
    page = page - 1
  if (page <= this.totalPages) {
    
    this.userServ.getCasinoTransactions(page).subscribe(
      (res: any) => {
        this.history = res.data.items
      },
      error => {
        console.log(error);
      }
    )
  }

  }

  counter(totalPages: number) {
    return new Array(totalPages);
  }

}
