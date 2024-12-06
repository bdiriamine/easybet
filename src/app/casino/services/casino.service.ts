import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FavoritGame } from '../interfaces/favoritGame';
@Injectable({
  providedIn: 'root'
})
export class CasinoService {
  url: string;
  namesr: string;
  name = new Subject()
  listGames = new Subject()
  gameName: string;
  constructor(private httpClient: HttpClient) { }

  getGames(page: number, provider: string, type: string) {
    return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&provider=' + provider + '&size=' + 12 + '&type=' + type);
  }

  getGamesByCategory(page: number, category: string, type: string) {
    return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&category=' + category + '&size=' + 12 + '&type=' + type);
  }

  getGamesByName(page: number, name: string, type: string) {
    return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&name=' + name + '&size=' + 100 + '&type=' + type);
  }

  getFav() {
    return this.httpClient.get(environment.apiUrl + 'favoris_games');
  }

  addFav(gId: FavoritGame) {
    return this.httpClient.get(environment.apiUrl + 'add_favoris_games?game_id=' + gId);
  }

  delFav(gId: FavoritGame) {
    return this.httpClient.get(environment.apiUrl + 'delete_favoris_games?game_id=' + gId);
  }

  openGames(gameUrl: string) {
    const token = localStorage.getItem('tkGameEsy');
    return this.httpClient.post(environment.apiUrl + "open?playUrl=" + gameUrl + token, {"type": 2})
  }

  getlistGameInterfaceGame() {
    return this.httpClient.get(environment.apiUrl + "home_games?type=casino");
  }

  getHomeGamesLiveCasino() {
    return this.httpClient.get(environment.apiUrl + "home_games?type=live casino");
  }

  getHomeGamesVirtual() {
    return this.httpClient.get(environment.apiUrl + "home_games?type=virtual");
  }

  getSearchValue(gameSearch: string) {
    this.gameName = gameSearch;
  }

  getGameService(games: any) {
    this.listGames.next(games)
  }

  getval(e: string) {
    this.namesr = e
  }

  getCategory(type: string) {
    return this.httpClient.get(environment.apiUrl + 'category?type=' + type);
  }

  openGapiGame(id: string, tag: string) {
    return this.httpClient.post(environment.apiUrl +  "open", {
      "type": 1,
      "game": tag,
      "login": id
    });

  }

}