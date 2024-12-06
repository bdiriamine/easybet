import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ThemeModeService } from 'src/app/core/services/theme-mode.service';
import { MainActionsService } from '../../services/main-actions.service';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { SocketService } from 'src/app/core/services/socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterContentChecked {
  mode: boolean = true;
  currentPath: string | undefined
  isConnected = false;
  element: HTMLElement | null;
  rightBarOn = new BehaviorSubject<boolean>(false);
  showUserDetails: Boolean = false;
  @ViewChild('profileButton') profileButton: ElementRef;
  @ViewChild('profilIcon') profilIcon: ElementRef;
  balance: number;

  constructor(
    private mainService: MainActionsService,
    private router: Router,
    private modalService: NgbModal,
    private localStorageServ: LocalstorageService,
    private modeThemeServ: ThemeModeService,
    private socketServ: SocketService,
    private authServ: AuthService,
    private toastrSer: ToastrService) {
    this.mainService.currentPath.subscribe(currentPath => { this.currentPath = currentPath })
  }

  async ngOnInit() {
    this.localStorageServ.setItem('mode', 'dark');
    if (this.localStorageServ.getItem('token') !== undefined && this.localStorageServ.getItem('token') !== null) this.isConnected = true;
    else this.isConnected = false;

    this.localStorageServ.storageSub.subscribe(res => {
      if (this.localStorageServ.getItem('token') != undefined && this.localStorageServ.getItem('token') !== null) this.isConnected = true;
      else this.isConnected = false;
    })

    this.router.events.subscribe((val) => {
      this.showUserDetails = false;
    });

    await this.socketServ.connect();
    await this.getBalance();

    this.socketServ.myOBSolde.subscribe((data: any) => {
      if (data.balance !== -1) {
        this.balance = data.balance;
      }
      else if (data.balance === -1) {
        this.toastrSer.warning('You are already logged in on another device', 'Warning');
        this.authServ.logout();
        this.isConnected = false;
      }
    })
  }

  openModal() {
    this.modalService.open(LoginComponent, { backdrop: "static" });
  }

  ngAfterContentChecked() {
    this.mainService.currentPath.next(this.router.routerState.snapshot.url)
  }

  openLeftBar() {
    this.mainService.right_tab.next(false)
    this.mainService.left_tab.next(true)
    this.element = document.getElementById('scrollnon')
    this.element!.style.overflowY = "hidden"
  }

  openRightBar() {
    this.mainService.left_tab.next(false)
    this.mainService.right_tab.next(true)
  }

  checkCheckBoxvalue(event: any) {
    if (event.target.checked) this.modeThemeServ.switchTheme('dark');
    else this.modeThemeServ.switchTheme('light');
  }

  open(val: boolean) {
    document.body.style.overflow = 'hidden'
    this.rightBarOn.next(val);
  }

  openUserDetails(val: boolean) {
    this.showUserDetails = !this.showUserDetails
  }

  getBalance() {
    if (this.localStorageServ.getItem('userid') == undefined || this.localStorageServ.getItem('userid') == null) {
      this.authServ.userID.subscribe((res: any) => {
        const fpPromise = FingerprintJS.load();
        fpPromise
          .then(fp => fp.get())
          .then(result => {
            this.localStorageServ.setItem('fp',res);
            this.socketServ.getBalance(result.visitorId, res);
          })
      })
    } else {
      const fpPromise = FingerprintJS.load()
      fpPromise
        .then(fp => fp.get())
        .then(result => {
          this.localStorageServ.setItem('fp',result);
          const userId = this.localStorageServ.getItem('userid')
          this.socketServ.getBalance(result.visitorId, userId);
        })
    }
  }

}
