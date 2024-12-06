import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  APP_PREFIX = 'easy-bet';
  storageSub = new Subject<String>();

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(`${this.APP_PREFIX}-${key}`, JSON.stringify(value));
    this.storageSub.next('changed');
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${this.APP_PREFIX}-${key}`) !);
  }

  removeItem(key: string){
    localStorage.removeItem(`${this.APP_PREFIX}-${key}`)
  }
}
