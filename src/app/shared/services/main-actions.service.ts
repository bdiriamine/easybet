import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class MainActionsService {
  right_tab: Subject<boolean> = new Subject<boolean>()
  left_tab: Subject<boolean> = new Subject<boolean>()
  mode: BehaviorSubject<string> = new BehaviorSubject<string>('')
  currentPath : BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    private router: Router,
    private localStorageServ: LocalstorageService
    ) {
    // this.mode.next(this.localStorageServ.getItem('mode') || 'dark');
    // this.modeIntercepter()
  }

  goTo(name: string) {
    switch (name) {
      case name = 'prelive':
      case name = 'inplay':
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => { this.router.navigate(['sport/' + name]) })
          .finally(()=>{this.currentPath.next('/sport/' + name)})
        break;
      case name = 'showgames':
      case name = 'skillgames':
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => { this.router.navigate(['casino/' + name]) })
          .finally(()=>{this.currentPath.next('/casino/' + name)})
        break;
      case name = 'minigames':
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => { this.router.navigate(['games/' + name]) })
          .finally(()=>{this.currentPath.next('/games/' + name)})
        break;
        case name = 'home':
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => { this.router.navigate([name]) })
          .finally(()=>{this.currentPath.next('/home')})
        break;
    }
  }



  // modeIntercepter() {
  //   this.mode.subscribe(mode => {
  //     switch (mode) {
  //       case 'light':
  //         this.tolight();
  //         this.localStorageServ.setItem('mode', 'light')
  //         break;
  //       case 'dark':
  //         this.todark();
  //         this.localStorageServ.setItem('mode', 'dark')
  //         break;
  //       default:
  //         break;
  //     }
  //   })
  // }

  // tolight() {
  //   document.documentElement.style.setProperty(`--header-background`, '#133d4e');
  //   document.documentElement.style.setProperty(`--selected`, '#060b27');
  //   document.documentElement.style.setProperty(`--background`, '#fff');
  // }
  // todark() {
  //   document.documentElement.style.setProperty(`--header-background`, '#060b27');
  //   document.documentElement.style.setProperty(`--selected`, '#133d4e');
  //   document.documentElement.style.setProperty(`--background`, '#050615');
  // }

}
