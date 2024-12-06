import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { MinigamesService } from 'src/app/minigames-mob/services/minigames.service';
import { CasinoService } from '../../services/casino.service';
@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() image: string | undefined;
  @Input() game_url: string

  @Input() gameId: number
  urlIfram: any;
  @ViewChild('iframe') iframe: ElementRef<HTMLInputElement>;

  @Input() type: number;
  @Input() userId: string;
  @Input() game: any;
  @Input() isFiable: boolean;


  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private miniServ: MinigamesService,
    private casinoG: CasinoService,
    private _sanitizationService: DomSanitizer,
    private localStorageServ: LocalstorageService) {
    config.backdrop = 'static';
    config.keyboard = false;
    document.body.style.overflow = 'hidden';
  }

  ngOnInit(): void {
    this.userId = this.localStorageServ.getItem('userid');
    if (this.isFiable) {
      this.getFiableGames()
    } else if (this.game.gapi == true) {
      this.openGame()
    } else {
      this.getgame()
    }

  }



  getgame() {
    this.casinoG.openGames(this.game_url).subscribe((games: any) => {
      // this.urlIfram= this._sanitizationService.bypassSecurityTrustResourceUrl(games.message);
      if (games) {
        this.urlIfram = this._sanitizationService.bypassSecurityTrustResourceUrl(games.message);
      }

    })
  }

  openGame() {
    this.casinoG.openGapiGame(this.userId, this.game.tag).subscribe((res: any) => {
      this.urlIfram = this._sanitizationService.bypassSecurityTrustResourceUrl(res.message);
    })
  }

  getFiableGames() {
    if (this.name == "Chicken") {
      this.miniServ.openGamefiableService(this.game_url, 4).subscribe((games: any) => {
        // this.urlIfram= this._sanitizationService.bypassSecurityTrustResourceUrl(games.message);
        if (games) {
          this.urlIfram = this._sanitizationService.bypassSecurityTrustResourceUrl(games.data);
        }

      })
    } else {
      this.miniServ.openGamefiableService(this.game_url, 5).subscribe((games: any) => {
        // this.urlIfram= this._sanitizationService.bypassSecurityTrustResourceUrl(games.message);
        if (games) {
          this.urlIfram = this._sanitizationService.bypassSecurityTrustResourceUrl(games.data);
        }

      })
    }

  }

  openFullscreen() {
    this.iframe.nativeElement.requestFullscreen();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }
}
