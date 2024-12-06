import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-web-profile-links',
  templateUrl: './web-profile-links.component.html',
  styleUrls: ['./web-profile-links.component.scss']
})
export class WebProfileLinksComponent implements OnInit {
  @Output() opened = new EventEmitter<boolean>();
  @Input() profileButton: ElementRef;
  @ViewChild('userDetails') userDetails: ElementRef;
  username: string;

  constructor(
    private authSer: AuthService,
    private renderer: Renderer2,
    private localStorageServ: LocalstorageService) { }

  ngOnInit(): void {
    this.username = this.localStorageServ.getItem('username')
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.userDetails.nativeElement && e.target !== this.profileButton.nativeElement) {
        this.opened.emit(false);
      }
    });
  }

  logout(val: boolean) {
    this.authSer.logout();
    this.opened.emit(val);
  }

}
