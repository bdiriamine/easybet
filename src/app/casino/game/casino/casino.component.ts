import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.scss']
})
export class CasinoComponent implements OnInit ,OnDestroy{
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
  gamesByProvider: any
  namesearch: string
  choosenProvider = new BehaviorSubject<string>('');
  categoriesList: any[]
  filterType: string;

  constructor(
    private casinoServ: CasinoService,private local :LocalstorageService) { }
  ngOnDestroy(): void {
    this.local.setItem("casinoFilter","all")
  }

  ngOnInit() {
    this.getCategories();
    this.getcasinogames();

    
  }

  getcasinogames() {
    this.casinoServ.getlistGameInterfaceGame().subscribe((res: any) => {
      this.listProviders = res.providers
    })
  }

  getGamesLis(games: any) {
    this.gamesByProvider = games;
  }

  showAllGames() {
    this.gamesByProvider = undefined;
  }

  searchname(e: any) {
    this.casinoServ.getval(e)
  }

  getProviderChoosen(val: string) {
    this.choosenProvider.next(val);
  }

  async getCategories() {
    await this.casinoServ.getCategory('casino').subscribe((res: any) => {
      this.categoriesList = res.data;
    })
  }

  getFilterType(filter: string) {
    this.filterType = filter;
  }
}
