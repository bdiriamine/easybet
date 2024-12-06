import {  Component, Input, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { GameModalComponent } from '../../../casino/views/game-modal/game-modal.component';
import { FavoritGame } from '../../interfaces/favoritGame';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: any = {}
  closeResult = '';
  showname = false;
  isImgLoaded: boolean = false;
  favGamesList: any[] = [];
  userId: string;
  liked: boolean;


  constructor(
    private modalService: NgbModal,
    private casinoServ: CasinoService,
    private toastmessageS: ToastrService,
    private localStorageServ: LocalstorageService) {
  }

  async ngOnInit() {
    this.userId = this.localStorageServ.getItem('userid');
    this.getAllLikedGames();

    await this.localStorageServ.storageSub.subscribe(res => {
       this.getAllLikedGames();
    })
  }

  async getAllLikedGames() {
    if (this.userId !== undefined && this.userId !== null) {
      this.favGamesList = this.localStorageServ.getItem('favGamesList');
       const index = await this.favGamesList.findIndex((res: any) => { return this.game.id === res.game_id });
      if (index > -1) {
        this.liked = true;
      }
      else {
        this.liked = false;
      }
    }
  }

  showgamename() {
    this.showname = true
  }

  hidegamename() {
    this.showname = false
  }

  openG() {
    if (localStorage.getItem('easy-bet-username') == undefined) {
      this.toastmessageS.info(('Vous devez être connecté pour ouvrir le jeu'), 'Warning');
      return;
    } else {
      const modalRef = this.modalService.open(GameModalComponent, { modalDialogClass: 'modal-fullscreen' });
      modalRef.componentInstance.name = this.game.label;
      modalRef.componentInstance.image = this.game.logo_url;
      modalRef.componentInstance.game_url = this.game.play_url;
      modalRef.componentInstance.game = this.game;
    }
  }

  addfav(gameId: FavoritGame) {
    this.favGamesList = this.localStorageServ.getItem('favGamesList');

    if (this.userId !== undefined && this.userId !== null) {
      const index = this.favGamesList.findIndex(res => {        
        return res.game_id === gameId
      });
      if (index > -1) {
        this.casinoServ.delFav(gameId).subscribe(res => {
          this.toastmessageS.success('Success', 'Game deleted')
          this.favGamesList = this.favGamesList.splice(index);
          this.localStorageServ.setItem('favGamesList', this.favGamesList);
          this.getAllLikedGames()

        })
      } else {
        this.casinoServ.addFav(gameId).subscribe((res: any) => {
          this.toastmessageS.success('Success', 'Game added')
          this.favGamesList.push({game_id: gameId})
          this.localStorageServ.setItem('favGamesList', this.favGamesList);

          this.getAllLikedGames()
        })
      }
    } else {
      this.toastmessageS.warning('Vous devez être connecté pour créer une liste de jeux favoris', 'Oops')
    }
  }

}
