import { Component, OnDestroy,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { SportService } from 'src/app/shared/services/sport.service';

@Component({
  selector: 'app-live-sport',
  templateUrl: './live-sport.component.html',
  styleUrls: ['./live-sport.component.scss']
})
export class LiveSportComponent implements OnInit,OnDestroy {
  url !: SafeResourceUrl;
  token!: any;
  username: string = '';
  usernameSub: Subscription;
  ipFySub: Subscription;
  clientIp: string;
  el = document.getElementById('ftr')
  innerWidth: number;

  constructor(
    private localStorageServ: LocalstorageService,
    private _domSanitizerServ: DomSanitizer,
    private sportServ: SportService) { }


  async ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 767){
      (this.el as HTMLElement).style.display = 'none';
    }

    if (this.localStorageServ.getItem('token') !== undefined && this.localStorageServ.getItem('token') !== null) {
      this.username = this.localStorageServ.getItem('username')
    }
    else this.username = ''

    this.usernameSub = await this.localStorageServ.storageSub.subscribe(res => {
      if (this.localStorageServ.getItem('token') != undefined && this.localStorageServ.getItem('token') !== null) {
        this.username = this.localStorageServ.getItem('username')
      }
      else this.username = ''
    })

    this.getIframeURL();

  }

  getIframeURL() {
    if (this.username != '') {
      this.clientIp = this.localStorageServ.getItem('clientIp');
      this.sportServ.getSportToken(this.username, this.clientIp).subscribe((res: any) => {
        if (res.status == 'success') {
          this.localStorageServ.setItem('sp-token', res.data.token);
          this.token = res.data.token;


          const myToken = this.token !== undefined && this.token !== null ? this.localStorageServ.getItem('sp-token') : "guest-user";

          this.url = this._domSanitizerServ.bypassSecurityTrustResourceUrl('https://if-playlogiq.sportstats.eu/api/auth/' + myToken + '/fr/1?public=CLUBEASYBET');
        }
      });
    } else this.url = this._domSanitizerServ.bypassSecurityTrustResourceUrl('https://if-playlogiq.sportstats.eu/api/auth/' + "guest-user" + '/fr/1?public=CLUBEASYBET');
  }

  ngOnDestroy(): void {
    if (this.username !== '') {
      this.usernameSub.unsubscribe();
      // this.ipFySub.unsubscribe();
    }
    (this.el as HTMLElement).style.display = 'block'
  }

}
