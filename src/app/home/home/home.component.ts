import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ThemeModeService } from 'src/app/core/services/theme-mode.service';
import { MainActionsService } from 'src/app/shared/services/main-actions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mode : boolean;
  now: Date = new Date();
  images = [

    { src: '../../../assets/caro/slider1.webp' },
    { src: '../../../assets/caro/slider2.webp' },
    { src: '../../../assets/caro/slider3.webp' },

  ]

  listGame = [
    {
      "game_name": "GonzoÃ©s Treasure Hunt",
      "game_image": "https://www.starsbet365.com/remote-casino-assets/Gonzos-Treasure-Hunt---Evolutions-Thumbnails_500x500.jpg",

    },
    {
      "game_name": "Archer",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/Archer.png",

    },
    {
      "game_name": "Rocky",
      "game_image": "https://free-slots-no-download.com/wp-content/uploads/sites/10015/Rocky-Playtech.jpg",

    },
    {
      "game_name": "Great Blue",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/GreatBlue.png",

    },
    {
      "game_name": "Funky Fruit's Farm",
      "game_image": "https://slotcatalog.com/userfiles/image/games/Playtech/2383/Funky-Fruits-Farm-1.jpg",

    },
    {
      "game_name": "Dr Lovemore",
      "game_image": "https://assets.vegasslotsonline.com/vegasslotsonline.com/assets/uploads/games/playtech/images/dr-lovemore.jpg",

    }


  ]
  listGame2 = [{
    "game_name": "Halloween Fortune",
    "game_image": "https://cdn.softswiss.net/i/s3/playtech/HalloweenFortune.png",

  },
  {
    "game_name": "White King",
    "game_image": "https://cdn.softswiss.net/i/s3/playtech/WhiteKing.png",

  },
  {
    "game_name": "Archer",
    "game_image": "https://cdn.softswiss.net/i/s3/playtech/Archer.png",

  },
  {
    "game_name": "Mr Cachback",
    "game_image": "https://fr.top100.casino/uploads/game/wide_image/12207/s4GI73dsFW9YN5JmgqrZWqUo94nd5eTyJpqQyyyA.jpg",

  },
  {
    "game_name": "Santa Surprise",
    "game_image": "https://cdn.softswiss.net/i/s3/playtech/SantaSurprise.png",

  },
  {
    "game_name": "Captain's Treasure",
    "game_image": "https://cdn.softswiss.net/i/s3/playtech/CaptainTreasure.png",

  },
  ]
  listGame3 = [
    {
      "game_name": "A Night Out",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/nightout.png",

    },
    {
      "game_name": "Gladiator Jackpot",
      "game_image": "https://image.winudf.com/v2/image/Y29tLmdsYWRpYXRvcmphY2twb3RyZXZpZXdzYnlwbGF5ZXJzLnNsb3RzdG9yeV9zY3JlZW5fMV8xNTM2OTA4NTUwXzA3MA/screen-1.jpg?fakeurl=1&type=.jpg",

    },

    {
      "game_name": "Archer",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/Archer.png",

    },
    {
      "game_name": "Funky Monkey",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/FunkyMonkey.png",

    },
    {
      "game_name": "Zhao Cai Jin Bao",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/ZhaoCaiJinBao.png",

    },
    {
      "game_name": "Wu Long",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/WuLong.png",

    },
  ]
  listGame4 = [
    {
      "game_name": "Highway Kings",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/HighwayKings.png",

    },

    {
      "game_name": "Funky Fruits Jackpot",
      "game_image": "https://www.jackpot-mania.com/images/jackpot-logo/funky-fruits-1.png",

    },
    {
      "game_name": "Highway Kings",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/HighwayKings.png",

    },
    {
      "game_name": "Archer",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/Archer.png",

    }
    ,

    {
      "game_name": "Archer",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/Archer.png",

    },
    {
      "game_name": "Cat Queen",
      "game_image": "https://cdn.softswiss.net/i/s3/playtech/CatQueen.png",

    }]

  constructor(
    private mainService: MainActionsService,
    private modeThemeServ: ThemeModeService,
    private localStorageServ: LocalstorageService,
  ) { }

  ngOnInit(): void {
    if (this.localStorageServ.getItem('mode') == undefined && this.localStorageServ.getItem('mode') == null) this.mode = true
    else {
      if(this.localStorageServ.getItem('mode') == 'dark') this.mode = true
      else this.mode = false
    }
  }
  checkCheckBoxvalue(event: any) {
    if (event.target.checked) this.modeThemeServ.switchTheme('dark');
    else this.modeThemeServ.switchTheme('light');
  }
}
