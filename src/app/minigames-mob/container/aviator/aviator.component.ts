import { Component, OnInit } from '@angular/core';
import { MinigamesService } from '../../services/minigames.service';
import { filter, map } from 'rxjs/operators';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastmessageService } from 'src/app/casino/services/toastmessage.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-aviator',
  templateUrl: './aviator.component.html',
  styleUrls: ['../minigames/minigames.component.scss']
})
export class AviatorComponent implements OnInit {
  urlimagebg="../../../assets/aviator-bg-image1.webp"
  listGames:any;
  listminiGmaes=new Array(); 
  aviatorgames:any
  totaltem:number
  
  constructor(private miniServ : MinigamesService,private modalService: NgbModal,
    private toastmessageS: ToastmessageService,) { }

  ngOnInit(): void {

    this.miniServ.getGames('aviator') .subscribe((res: any) => {
      this.listGames = res.message.items
      this.totaltem= res.message.totalItems
      this.getGames()
    });

  }
  playCasinoGame(playUrl:string){

  }
  getGames(){
  
    for(let i = 0; i <  this.totaltem; i++) {
      if(this.listGames[i].gameId =="aviator"){
        this.aviatorgames = this.listGames[i]
      
        
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
