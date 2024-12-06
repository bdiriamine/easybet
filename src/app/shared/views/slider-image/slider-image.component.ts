import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {
  @Input() slidesStore: any[] | undefined

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 500,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  constructor() {

  }

  ngOnInit(): void {

  }

}
