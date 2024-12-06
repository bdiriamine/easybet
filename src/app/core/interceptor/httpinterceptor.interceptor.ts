import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {
  userToken: any

  constructor(
    private localStorageServ: LocalstorageService,
    private authServ: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userToken = this.localStorageServ.getItem("token");
    if (request.url.includes('api.ipify.org') == false && request.url.includes('apg_b2d3445b_f54d_4ee8_a1b1_6cf883490cf7.init()') == false) {
      if ((this.userToken !== null && this.userToken !== undefined) && this.authServ.isTokenExpired()) {
        this.authServ.logout()

        return next.handle(request)
        .pipe(
          tap(event => {
          }, error => {
          })
        )
      } else {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userToken}`
          }
        });
        return next.handle(cloned)
        .pipe(
          tap(event => {
          }, error => {
          })
        )
      }
    } else {
      return next.handle(request)
      .pipe(
        tap(event => {
        }, error => {
        })
      )
    }
  }
}
