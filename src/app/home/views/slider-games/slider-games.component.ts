import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-games',
  templateUrl: './slider-games.component.html',
  styleUrls: ['./slider-games.component.scss']
})
export class SliderGamesComponent implements OnInit {
  @Input() slidesGames: any[] | undefined

  customOptions: OwlOptions = {
    navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ],
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  constructor() { }

  ngOnInit(): void {
  }


}
