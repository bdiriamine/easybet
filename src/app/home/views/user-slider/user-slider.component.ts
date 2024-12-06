import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-user-slider',
  templateUrl: './user-slider.component.html',
  styleUrls: ['./user-slider.component.scss']
})
export class UserSliderComponent implements OnInit {
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
