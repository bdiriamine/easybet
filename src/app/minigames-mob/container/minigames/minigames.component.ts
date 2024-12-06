import { Component, OnInit } from '@angular/core';
import { MinigamesService } from '../../services/minigames.service';
import { filter, map } from 'rxjs/operators';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastmessageService } from 'src/app/casino/services/toastmessage.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
@Component({
  selector: 'app-minigames',
  templateUrl: './minigames.component.html',
  styleUrls: ['./minigames.component.scss']
})
export class MinigamesComponent implements OnInit {
  urlimagebg = "../../../assets/dinobg.jpg"
  listGames: any;
  listminiGmaes = new Array();
  dino: any
  totaltem: number

  constructor(private miniServ: MinigamesService, private modalService: NgbModal,
    private toastmessageS: ToastmessageService,) { }

  ngOnInit(): void {
    this.miniServ.getDino().subscribe((res: any) => {
      this.listGames = res.data
      this.totaltem = res.data.length
      this.getGames()
    });

  }
  playCasinoGame(playUrl: string) {

  }
  getGames() {

    for (let i = 0; i < this.totaltem; i++) {

      if (this.listGames[i].name == "dino") {
        this.dino = this.listGames[i]


      } else {
        this.listminiGmaes.push(this.listGames[i])

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
      modalRef.componentInstance.gameId = 1;
      modalRef.componentInstance.game = game;
      modalRef.componentInstance.isFiable = true;

      

    }
  }
  

}
