import { Component, OnInit } from '@angular/core';
import { MainActionsService } from '../../services/main-actions.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-box-side-nav',
  templateUrl: './box-side-nav.component.html',
  styleUrls: ['./box-side-nav.component.scss']
})
export class BoxSideNavComponent implements OnInit {
isConnected =localStorage.getItem("tkGameEsy");
  element: HTMLElement | null;
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
  
  constructor(
    private mainService: MainActionsService,private auth: AuthService,private modalService: NgbModal,private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.userID.subscribe((userID:any) => {
      this.isConnected =localStorage.getItem("tkGameEsy");
    })
  }
  closeLeftBar() {
    this.element = document.getElementById('scrollnon')
    this.element!.style.overflowY = "auto"
    this.mainService.left_tab.next(false)
    this.navs.forEach(nav => {
       nav.name == 'sidehome' ? nav.opened = true : nav.opened = false
    });
  }
  openModal() {
    // this.modalService.dismissAll()
    this.closeLeftBar();
    const modal: NgbModalRef = this.modalService.open(LoginComponent,{ modalDialogClass: 'modal-fullscreen' });
  }
  goToLudo(){
    
    this.closeLeftBar();
    this.router.navigate(['/mini-games/ludo'])
  }
}
