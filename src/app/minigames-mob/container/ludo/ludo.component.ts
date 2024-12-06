import { Component, OnInit } from '@angular/core';
import { MinigamesService } from '../../services/minigames.service';
import { filter, map } from 'rxjs/operators';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastmessageService } from 'src/app/casino/services/toastmessage.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
@Component({
  selector: 'app-ludo',
  templateUrl: './ludo.component.html',
  styleUrls: ['../minigames/minigames.component.scss']
})
export class LudoComponent implements OnInit {
  urlimagebg="../../../assets/lud.webp"
  listGames:any;
  listminiGmaes=new Array(); 
  ludogames:any
  totaltem:number
  
  constructor(private miniServ : MinigamesService,private modalService: NgbModal,
    private toastmessageS: ToastmessageService,) { }

  ngOnInit(): void {
    this.miniServ.getGames('ludo') .subscribe((res: any) => {
      this.listGames = res.message.items
      this.totaltem= res.message.totalItems
      this.getGames()
    });

  }
  playCasinoGame(playUrl:string){

  }
  getGames(){
  
    for(let i = 0; i <  this.totaltem; i++) {
      if(this.listGames[i].label =="Ludo"){
        this.ludogames = this.listGames[i]
      
        
      }else{
        this.listminiGmaes.push(this.listGames[i]) 
    
      }
    }

  }
  openG(urlplay:string,image:string,name:string,game:any) {
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

}
