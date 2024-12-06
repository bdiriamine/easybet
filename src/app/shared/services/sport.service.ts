import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(
    private http: HttpClient,
    private localStorageServ: LocalstorageService,
    private router: Router
  ) { }

  getSportToken(username: string, clientIp: string) {
    return this.http.post('https://sport.easybet.tn/api/auth', { username: username, clientip: clientIp, currency: "TND" })
  }

}
