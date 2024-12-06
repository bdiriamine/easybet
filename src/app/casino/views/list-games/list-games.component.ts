import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit {
  casinoname: any;
  @Input() listGames: any;
  end = false;
  games: any
  listGame: []
  provider: string
  category: string
  pagination: any
  page: any = 1;
  totalIPages: any;
  tabLength: any;
  currentRoute: string;
  @Input() filterType: string;

  constructor(private casinoGameServ: CasinoService, private router: Router, private local: LocalstorageService) { }

  async ngOnInit() {
    this.currentRoute = this.router.url;
    if (this.currentRoute !== '/games/favorit') {
      this.games = []
      this.getourliste();
      this.provider = await this.listGames.items[0].provider;
      this.category = await this.listGames.items[0].category;
      this.games = this.listGames.items;
    }
    else {
      this.getFavGames();
    }
  }

  loadmore() {
    let categorycasino = this.local.getItem("casinoFilter")
    let categorylivecasino = this.local.getItem("casinoLiveFilter")

    if (this.casinoGameServ.namesr) {
      this.provider = "Search"
      this.getCasinoGamesName(this.page)
    } else if ((categorycasino != "all") && (categorycasino != "")) {
      this.getCasinoGamescategory(this.page, categorycasino)
    } else if ((categorycasino == "all") && (categorycasino == "")) {
      this.getCasinoGamescategory(this.page, categorylivecasino!)
    } else {
      this.getCasinoGames(this.page, this.provider)
    }
  }

  getCasinoGames(page: number, name: string,) {
    if (name == undefined) {
      name = ''
    }

    if (!this.end) {
      if (this.router.url == '/games/live-casino') {
        this.casinoGameServ.getGames(page, this.provider, 'live casino').subscribe((res: any) => {

          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else if (this.router.url == '/games/casino') {
        this.casinoGameServ.getGames(page, this.provider, 'casino').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else {
        this.casinoGameServ.getGames(page, this.provider, 'virtual').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      }
    }
  }

  getCasinoGamescategory(page: number, name: string,) {
    if (name == undefined) {
      name = ''
    }

    if (!this.end) {
      if (this.router.url == '/games/live-casino') {
        this.casinoGameServ.getGamesByCategory(page, name, 'live casino').subscribe((res: any) => {

          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else if (this.router.url == '/games/casino') {
        this.casinoGameServ.getGamesByCategory(page, name, 'casino').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else {
        this.casinoGameServ.getGamesByCategory(page, name, 'virtual').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      }
    }
  }

  getCasinoGamesName(page: number) {
    if (!this.end) {
      if (this.router.url == '/games/live-casino') {
        this.casinoGameServ.getGamesByName(page, this.casinoGameServ.namesr, 'live casino').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else if (this.router.url == '/games/casino') {
        this.casinoGameServ.getGamesByName(page, this.casinoGameServ.namesr, 'casino').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      } else {
        this.casinoGameServ.getGamesByName(page, this.casinoGameServ.namesr, 'virtual').subscribe((res: any) => {
          this.pagination = res.message
          this.listGame = this.pagination.items
          this.tabLength = this.listGame.length
          this.listGame.forEach(element => {
            this.games.push(element)
          });
          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        })
      }

    }
  }

  async getourliste() {
    await this.casinoGameServ.listGames.subscribe((res: any) => {
      if (this.page < res.totalPages - 1) {
        this.end = false
      } else {
        this.end = true
      }
      this.games = res.items;
      this.provider = res.items[0].provider;
      this.category = res.items[0].category;
      this.page = 1;
    })
  }

  getFavGames() {
    this.casinoGameServ.getFav().subscribe((res: any) => {
      this.games = res.items;

    })
  }

}
