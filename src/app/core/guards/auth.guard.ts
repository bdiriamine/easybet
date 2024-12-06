import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userToken: string;

  constructor(
    private localStorageServ: LocalstorageService,
    private ngbModal: NgbModal,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userToken = this.localStorageServ.getItem('token')
    if (this.userToken == null && this.userToken == undefined) {
      this.router.navigate(['']);
      this.ngbModal.open(LoginComponent)
      return false
    }

    return true;
  }

}
