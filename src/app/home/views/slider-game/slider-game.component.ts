import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameModalComponent } from 'src/app/casino/views/game-modal/game-modal.component';

@Component({
  selector: 'app-slider-game',
  templateUrl: './slider-game.component.html',
  styleUrls: ['./slider-game.component.scss']
})
export class SliderGameComponent implements OnInit {
  @Input() game: any = {}
  showname = false
  isImgLoaded: boolean = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  showgamename() {
    this.showname = true
  }
  hidegamename() {
    this.showname = false
  }
  open() {
    const modalRef = this.modalService.open(GameModalComponent, { modalDialogClass: 'modal-fullscreen'});
    modalRef.componentInstance.name = this.game.game_name;
    modalRef.componentInstance.image = this.game.game_image;
  }
}
