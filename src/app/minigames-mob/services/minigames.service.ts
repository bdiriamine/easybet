import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MinigamesService {

  constructor(private httpClient: HttpClient) { }


  getGames(type: string) {
    return this.httpClient.get(environment.apiUrl + 'games?type=' + type+ '&size=' + 100 );
  }
  openGames(gameUrl: string) {
    const token = localStorage.getItem('tkGameEsy');
    return this.httpClient.get(environment.apiUrl + "open_game?playUrl=" + gameUrl + token);
  }
  getDino(){
    return this.httpClient.get(environment.apiUrl + 'f_games'+'?size=' + 100);
  }
  openGamefiableService(urlGame:string,id:number) {
    return this.httpClient.post(environment.apiUrl + 'open_f_game', {
      'game_url': urlGame,
      'type': id,
      "device": "desktop"
    });
  }
    openZEeplingame(){
    const token = localStorage.getItem('tkGameEsy');
    return this.httpClient.post('https://betsolutions.easybet.tn/api/open', {
      'client_type':"desktop",
      'token' : token
    });
  }

}
