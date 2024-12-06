import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(environment.apiUrl + 'profil');
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post(environment.apiUrl + 'password', { old_password: oldPassword, new_password: newPassword });
  }

  /**
   * Get Transfer history function
   * @param start_date : optional start date param
   * @param end_date : optional end date param
   * @returns an Http request
   */
  getCasinoTransactions(page: number, start_date?: Date, end_date?: Date) {
    if (start_date == null && end_date == null)
      return this.http.get(environment.apiUrl + 'casino?page=' + page);
    else if (start_date != null) return this.http.get(environment.apiUrl + 'casino?start_date=' + start_date);
    else return this.http.get(environment.apiUrl + 'casino?start_date=' + start_date + '&end_date=' + end_date);
  }

  getTransfertList() {
    return this.http.get(environment.apiUrl + 'transfert').toPromise();
  }
  getTiccket(page:number , name:string,firstbetDate:any,endbetDate:any){
    return this.http.get(environment.apiUrl + 'ticket?start_date='+firstbetDate+'&end_date='+endbetDate+'&username='+name+'&page='+page)
  }
}
