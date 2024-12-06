import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientIp!: string;
  token = new Subject();
  userID = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private localStorageServ: LocalstorageService
  ) { }

  async signin(username: string, password: string) {
    this.http.post(environment.apiUrl + 'auth', { username: username, password: password }).subscribe((res: any) => {
      if (res.status == 200) {
        // ---get client ip
        this.getUserIp().then((res: any) => {
          const clientIp = JSON.parse(res).ip;
          this.localStorageServ.setItem('clientIp', clientIp)
        })
        localStorage.setItem('tkGameEsy', res.message.accessToken)
        this.localStorageServ.setItem('token', res.message.accessToken)
        this.localStorageServ.setItem('username', res.message.username)
        this.localStorageServ.setItem('userid', res.message.id)

        this.localStorageServ.setItem('favGamesList', res.message.favoris)
        this.userID.next(res.message.id);
        this.toastr.success('vous êtes connecté avec succès', 'félicitations')
        this.router.navigate(['home'])
      } else {
        this.toastr.error('un problème est survenu', 'Oops');
      }
    },   error =>  this.toastr.error('un problème est survenu', 'Oops'))
  }

  logout() {
    localStorage.clear();
    this.token = new Subject();
    this.router.navigate(['home']);
    this.localStorageServ.storageSub.next('changed')
    this.userID.next('');
    this.router.navigate(["/"]).then(() => { window.location.reload() })
  }

  getToken() {
    return this.localStorageServ.getItem('token');
  }

  getTokenExpirationDate(token: any): any {
    token = this.getToken();
    var decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: any): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;

    return !(date.valueOf() > new Date().valueOf());
  }

  async getUserIp() {
    return await this.http.get("https://api.ipify.org/?format=json", { responseType: 'text' }).toPromise()
  }
}


