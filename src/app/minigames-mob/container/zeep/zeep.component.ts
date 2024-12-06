import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';
import { MinigamesService } from '../../services/minigames.service';

@Component({
  selector: 'app-zeep',
  templateUrl: './zeep.component.html',
  styleUrls: ['../minigames/minigames.component.scss']
})
export class ZeepComponent implements OnInit {
  urlimagebg="https://easybet.tn/assets/zee.jpg"
 constructor(private miniServ: MinigamesService,private modalService: NgbModal,) { }

  ngOnInit(): void {
  }
openZEep(){
    this.miniServ.openZEeplingame().subscribe((res:any) => {
      window.location.href = 'https://'+res.data
    })
  }

}
