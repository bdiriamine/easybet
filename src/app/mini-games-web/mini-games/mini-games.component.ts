import { Component, OnInit } from '@angular/core';
import { MiniGame } from '../interfaces/miniGame';
import { MiniGamesService } from '../services/mini-games.service';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastmessageService } from 'src/app/casino/services/toastmessage.service';
@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss']
})
export class MiniGamesComponent implements OnInit {
  games: MiniGame[];
  listGames: any
  listminiGmaes = new Array();
  TopGame = new Array();
  totaltem: number;
  dinogame: any;
  dinogamesList = new Array();
  constructor(
    private miniGamesServ: MiniGamesService,
    private modalService: NgbModal,
    private toastmessageS: ToastmessageService,
    private miniServ: MiniGamesService) { }

  ngOnInit(): void {
    this.getDino()
    this.getAviator()
    this.getLudo()
    this.getSpaceMan()
  }

  playCasinoGame(playUrl: string) {

  }
  getAviator() {
    this.miniGamesServ.getGames('aviator').subscribe((res: any) => {
      let Games = res.message.items
      let totaltemAVIA = res.message.totalItems
      this.getGames("Aviator", totaltemAVIA, Games)
    });
  }
  getLudo() {
    this.miniGamesServ.getGames('ludo').subscribe((res: any) => {
      let Games = res.message.items
      let totaltemAVIA = res.message.totalItems
      this.getGames("Ludo", totaltemAVIA, Games)
    });
  }
  getSpaceMan() {
    this.miniGamesServ.getGames('balloon').subscribe((res: any) => {
      let Games = res.message.items
      let totaltemAVIA = res.message.totalItems
      this.getGames("Live - Spaceman", totaltemAVIA, Games)
    });
  }
  getDino() {
    this.miniGamesServ.getDino().subscribe((res: any) => {
      let Games = res.data
      let totaltemAVIA = res.data.length
      this.getGamesDino("dino", totaltemAVIA, Games)
    });
  }
  getGames(nameGame: string, totalePage: number, game: any) {
    for (let i = 0; i < totalePage; i++) {
      if (game[i].label == nameGame) {
        this.TopGame.push(game[i])
      } else {
        this.listminiGmaes.push(game[i])

      }
    }
  }
  getGamesDino(nameGame: string, totalePage: number, game: any) {
    for (let i = 0; i < totalePage; i++) {
      if (game[i].name == nameGame) {
        this.dinogame = game[i]
      } else {
        this.dinogamesList.push(game[i])
      }
    }
  }

  openG(urlplay: string, image: string, name: string, game: any) {
    if (localStorage.getItem('easy-bet-username') == undefined) {
      this.toastmessageS.cnxmessage();
      return;
    } else {
      const modalRef = this.modalService.open(GameModalComponent, { modalDialogClass: 'modal-fullscreen' });
      modalRef.componentInstance.name = name;
      modalRef.componentInstance.image = image;
      modalRef.componentInstance.game_url = urlplay;
      modalRef.componentInstance.game = game;

    }
  }

  openGamecrash(urlplay: string, image: string, name: string) {
    if (localStorage.getItem('easy-bet-username') == undefined) {
      this.toastmessageS.cnxmessage();
      return;
    } else {
      const modalRef = this.modalService.open(GameModalComponent, { modalDialogClass: 'modal-fullscreen' });
      modalRef.componentInstance.name = name;
      modalRef.componentInstance.image = image;
      modalRef.componentInstance.game_url = urlplay;
      modalRef.componentInstance.isFiable = true;

    }




  }
    openZEep(){
    this.miniGamesServ.openZEeplingame().subscribe((res:any) => {
      console.log("hello")
      console.log(res);
      window.location.href = 'https://'+res.data
    })
  }


}
