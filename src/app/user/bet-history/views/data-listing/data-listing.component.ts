import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { UserService } from 'src/app/user/services/user.service';
import { ModelTicketComponent } from '../model-ticket/model-ticket.component';

@Component({
  selector: 'app-data-listing',
  templateUrl: './data-listing.component.html',
  styleUrls: ['./data-listing.component.scss']
})
export class DataListingComponent implements OnInit {
  @Input() endbetDate  = new Subject();
  @Input() firstbetDate = new Subject();
  username: string;
  details = false;
  tickets:any
  ftdatebet: any
  endDate:any;
  public hideRuleContent:boolean[] = [];
  public buttonName:any = 'x';
  totalPages: number;
  page = 0;
  active = 1;
  vide=true;
  pagevide = true
  constructor(private localStorageServ: LocalstorageService,private userHistoryServ : UserService,  private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.username = this.localStorageServ.getItem('username')
  
  
    this.firstbetDate.subscribe(res => { 
      this.ftdatebet = res
    })
    this.endbetDate.subscribe(res => {
      this.endDate = res 
      this.gettickets(this.ftdatebet,res)
    })
    
  }
  toggle(index:number) {
    // toggle based on index
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }
  openDetails(){
    this.details = !this.details;
  
  }
  gettickets(ftBet:any,endBet : any){
    this.username = this.localStorageServ.getItem('username')
    this.userHistoryServ.getTiccket( this.page,this.username , ftBet,endBet).subscribe((data:any) => {
      this.tickets =data.data.items,
      this.totalPages = data.data.totalPages * 10;
      if(this.totalPages>0){
        this.vide = false
        this.pagevide= false
      }
    })
  }
  getHistoryTickByPage(page: number) {
    page = page - 1
  if (page <= this.totalPages) {
    this.userHistoryServ.getTiccket( page,this.username,this.ftdatebet,this.endDate).subscribe(
      (res: any) => {
        this.tickets = res.data.items
        this.pagevide= false
      },
      error => {
        console.log(error);
      }
    )
  }

  }
  getCoupn(code:any){
    const modalRef = this.modalService.open(ModelTicketComponent, { modalDialogClass: 'modal-fullscreen' });
    modalRef.componentInstance.urlTicket = "https://if-playlogiq.sportstats.eu/wadmin/index.php?controller=ticketprint&noprint=1&module=ticket&ticketid="+code+"&copy&lang=fr";
  }
}
