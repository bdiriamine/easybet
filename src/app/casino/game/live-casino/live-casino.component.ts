import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-live-casino',
  templateUrl: './live-casino.component.html',
  styleUrls: ['./live-casino.component.scss']
})
export class LiveCasinoComponent implements OnInit, OnDestroy {

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

  listProviders: any[];
  gamesByProvider: any;
  choosenProvider = new BehaviorSubject<string>('');
  categoriesList: any[];
  filterType : string;

  constructor(private casinoServ: CasinoService,private local :LocalstorageService) { }
  ngOnDestroy(): void {
    this.local.setItem("casinoLiveFilter","all")
  }

  ngOnInit(): void {
    this.getCategories();
    this.getcasinogames();
  }

  getcasinogames() {
    this.casinoServ.getHomeGamesLiveCasino().subscribe((res: any) => {
      this.listProviders = res.providers
    })
  }

  getGamesLis(games: any) {
    this.gamesByProvider = games;
  }

  showAllGames() {
    this.gamesByProvider = undefined;
  }

  getProviderChoosen(val: string) {
    this.choosenProvider.next(val);
  }

  searchname(e:any){
    this.casinoServ.getval(e)
  }

  async getCategories() {
    await this.casinoServ.getCategory('live').subscribe((res: any) => {
      this.categoriesList =  res.data;
    })
  }

  getFilterType(filter: string) {
    this.filterType = filter;
  }
}