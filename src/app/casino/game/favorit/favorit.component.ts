import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FavoritGame } from '../../interfaces/favoritGame';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.scss']
})
export class FavoritComponent implements OnInit {
  images = [
    { src: '../../../assets/caro/cas1.webp' },
    { src: '../../../assets/caro/cas2.webp' },
    { src: '../../../assets/caro/cas3.webp' },
    { src: '../../../assets/caro/casino4.webp' },
    { src: '../../../assets/caro/sport1.webp' },
    { src: '../../../assets/caro/sport2.webp' },
    { src: '../../../assets/caro/sport3.webp' },
    { src: '../../../assets/caro/sport4.webp' }
  ]
  filterType: string;
  // favoritGamesList: FavoritGame[] = [];

  constructor() { }

  ngOnInit() {
  }

  getFilterType(filter: string) {
    this.filterType = filter;
  }

}
