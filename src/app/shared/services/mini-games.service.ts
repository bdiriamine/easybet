import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiniGamesService {

  constructor(private http: HttpClient) { }

  getMiniGames(){
    return this.http.get(environment.apiUrl + 'mini_games');
  }
}
