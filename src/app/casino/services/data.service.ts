import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  provider = new BehaviorSubject<string>('');

  constructor() { }

  updateProvider(val: string){
    this.provider.next(val);
  }
}
