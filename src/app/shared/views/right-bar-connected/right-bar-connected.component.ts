import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { SocketService } from 'src/app/core/services/socket.service';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ToastrService } from 'ngx-toastr';
import { ModelTicketComponent } from 'src/app/user/bet-history/views/model-ticket/model-ticket.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-right-bar-connected',
  templateUrl: './right-bar-connected.component.html',
  styleUrls: ['./right-bar-connected.component.scss']
})
export class RightBarConnectedComponent implements OnInit {
  selectedLng = 'fr';
  username: string;
  @Output() opened = new EventEmitter<boolean>();
  @Input() profilIcon: ElementRef;
  @ViewChild('rightnavs') rightnavs: ElementRef;
  balance: number;
  code: string = '';
  constructor(
    private authSer: AuthService,
    private localStorageServ: LocalstorageService,
    private router: Router,
    private renderer: Renderer2,
    private socketServ: SocketService,private modalService: NgbModal,
    private toastrSer: ToastrService
  ) { }

  async ngOnInit() {
    this.router.events.subscribe((val) => {
      this.close(false)
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.rightnavs.nativeElement && e.target !== this.profilIcon.nativeElement) {
        this.opened.emit(false);
        document.body.style.overflow = 'scroll';
      }
    });
    this.username = this.localStorageServ.getItem('username');
    if (this.localStorageServ.getItem('username') !== null && this.localStorageServ.getItem('username') !== undefined) this.getBalance();

    await this.getBalance();

    this.socketServ.myOBSolde.subscribe((data: any) => {
      if (data.balance !== -1) {
        this.balance = data.balance;
      }
      else if (data.balance === -1) {
        
        this.toastrSer.warning('You are already logged in on another device', 'Warning');
        this.authSer.logout();
      }
    })

  }

  logout() {
    this.authSer.logout();
    this.close(false)
  }

  close(val: boolean) {
    this.opened.emit(val);
    document.body.style.overflow = 'scroll';
  }

  getBalance() {
    if (this.localStorageServ.getItem('userid') == undefined || this.localStorageServ.getItem('userid') == null) {
      this.authSer.userID.subscribe((res: any) => {
        const fpPromise = FingerprintJS.load();
        fpPromise
          .then(fp => fp.get())
          .then(result => {
            this.socketServ.getBalance(result.visitorId, res);
          })
      })
    } else {
      const fpPromise = FingerprintJS.load()
      fpPromise
        .then(fp => fp.get())
        .then(result => {
          const userId = this.localStorageServ.getItem('userid')
          this.socketServ.getBalance(result.visitorId, userId);
        })
    }
  }
  getCoupn(code:any){
    const modalRef = this.modalService.open(ModelTicketComponent, { modalDialogClass: 'modal-fullscreen' });
    modalRef.componentInstance.urlTicket = "https://if-playlogiq.sportstats.eu/wadmin/index.php?controller=ticketprint&noprint=1&module=ticket&ticketid="+code+"&copy&lang=fr";
  }
}
