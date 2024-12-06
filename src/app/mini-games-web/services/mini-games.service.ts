import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiniGamesService {

  constructor(private http: HttpClient) { }


  getGames(type: string) {
    return this.http.get(environment.apiUrl + 'games?type=' + type+ '&size=' + 100 );
  }
  openGames(gameUrl: string) {
    const token = localStorage.getItem('tkGameEsy');
    return this.http.get(environment.apiUrl + "open_game?playUrl=" + gameUrl + token);
  }
  getDino(){
    return this.http.get(environment.apiUrl + 'f_games'+'?size=' + 100);
  }
  openGamefiableService(urlGame:string,id:number) {
    return this.http.post(environment.apiUrl + 'open_f_game', {
      'game_url': urlGame,
      'type': id,
      "device": "desktop"
    });
  }
    openZEeplingame(){
    const token = localStorage.getItem('tkGameEsy');
    return this.http.post('https://betsolutions.easybet.tn/api/open', {
      'client_type':"desktop",
      'token' : token
    });
  }

}
