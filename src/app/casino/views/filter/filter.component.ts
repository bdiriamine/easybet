import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CasinoService } from '../../services/casino.service';
import { DataService } from '../../services/data.service';
import { ModalProvidersComponent } from '../modal-providers/modal-providers.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  searchVal = '';
  @Output() showProviders = new EventEmitter<boolean>();
  @Input() Providers: boolean
  @Input() providersList: any[];
  @Input() categoryList: any[];
  @Output() providerName = new EventEmitter<string>();
  @Output() gamesList = new EventEmitter<any[]>();
  @Output() allGames = new EventEmitter<any>();
  @Input() providerChoosen = new BehaviorSubject<string>('');

  isConnected = this.localStorageServ.getItem("token")
  page = 0;

  isAllGames = true;
  @Output() filterType = new EventEmitter<string>();
  @Output() searchValName = new EventEmitter<any>();

  casinoFilter: string = 'all';
  casinoLiveFilter: string = 'all';
  virtualFilter: string = 'all';

  currentRoute: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private casinoServ: CasinoService,
    private localStorageServ: LocalstorageService,
    private toasterServ: ToastrService) { }

  async ngOnInit() {
    this.currentRoute = this.router.url;
    if ((this.localStorageServ.getItem("casinoFilter") !== null && this.localStorageServ.getItem("casinoFilter") !== 'all') && (this.localStorageServ.getItem("casinoFilter") !== '') && (this.router.url == '/games/casino')) {
      this.casinoFilter = this.localStorageServ.getItem("casinoFilter");
      this.getGamesByCategory(this.casinoFilter);
    } else if ((this.localStorageServ.getItem("casinoLiveFilter") !== null && this.localStorageServ.getItem("casinoLiveFilter") !== 'all') && (this.localStorageServ.getItem("casinoLiveFilter") !== '') && (this.router.url == '/games/live-casino')) {
      this.casinoLiveFilter = this.localStorageServ.getItem("casinoLiveFilter");
      this.getGamesByCategory(this.casinoLiveFilter);

    } else if ((this.localStorageServ.getItem("virtualFilter") !== null && this.localStorageServ.getItem("virtualFilter") !== 'all') && (this.localStorageServ.getItem("virtualFilter") !== '') && (this.router.url == '/games/virtual')) {
      this.virtualFilter = this.localStorageServ.getItem("virtualFilter");
      this.getGamesByCategory(this.virtualFilter);
    } else {
      this.showAllGames()
    }


    // --- selected provider
    this.providerChoosen.subscribe(res => {
      if (res !== '') {
        if (this.router.url == '/games/casino') {
          this.getGamesbyProvider(res);
        } else if (this.router.url == '/games/live-casino') {
          this.getGamesbyProvider(res);
        } else {
          this.getGamesbyProvider(res);
        }
      }
    })

    // -- listener on local storage filter to detect active items
    this.localStorageServ.storageSub.subscribe(res => {
      if (this.router.url == '/games/casino') {
        this.casinoFilter = this.localStorageServ.getItem('casinoFilter');
        // this.getGamesByCategory(this.casinoFilter);
      } else if (this.router.url == '/games/live-casino') {
        this.casinoLiveFilter = this.localStorageServ.getItem('casinoLiveFilter');
        // this.getGamesByCategory(this.casinoLiveFilter);
      } else {
        this.virtualFilter = this.localStorageServ.getItem('virtualFilter');
        // this.getGamesByCategory(this.virtualFilter);
      }
    })

  }

  getFavs(){
    this.filterType.emit('favorits');
    if(this.localStorageServ.getItem('token') == '' || this.localStorageServ.getItem('token') == undefined){
      this.toasterServ.error('You should connect', 'error')
    }
  }

  openProvider() {
    this.showProviders.emit(!this.Providers)
  }

  open() {
    const modalRef = this.modalService.open(ModalProvidersComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.providers = this.providersList;
    modalRef.componentInstance.providerName.subscribe((receivedEntry: string) => {
      if (receivedEntry !== '') {
        if (this.router.url == '/games/casino') {
          this.getGamesbyProvider(receivedEntry);
        } else if (this.router.url == '/games/live-casino') {
          this.getGamesbyProvider(receivedEntry);
        } else {
          this.getGamesbyProvider(receivedEntry);
        }

        this.isAllGames = false;
        this.modalService.dismissAll();
      }
    })
  }

  chooseProvider(providerName: string) {
    this.providerName.emit(providerName);
  }

  getGamesbyProvider(name: string) {
    this.filterType.emit('provider')

    if (this.router.url == '/games/live-casino') {
      this.casinoServ.getGames(this.page, name, 'live casino').subscribe((result: any) => {

        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    } else if (this.router.url == '/games/casino') {
      this.casinoServ.getGames(this.page, name, 'casino').subscribe((result: any) => {
        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    } else {
      this.casinoServ.getGames(this.page, name, 'virtual').subscribe((result: any) => {
        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    }
  }

  gameByName(name: string) {
    if (this.router.url == '/games/live-casino') {
      this.casinoServ.getGamesByName(this.page, name, 'live casino').subscribe((result: any) => {
        this.searchValName.emit(name)
        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    } else if (this.router.url == '/games/casino') {
      this.casinoServ.getGamesByName(this.page, name, 'casino').subscribe((result: any) => {
        this.searchValName.emit(name)
        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    } else {
      this.casinoServ.getGamesByName(this.page, name, 'virtual').subscribe((result: any) => {
        this.searchValName.emit(name)
        this.gamesList.emit(result.message);
        this.casinoServ.listGames.next(result.message);
      })
    }
  }

  showAllGames() {
    this.allGames.emit(true);
    this.isAllGames = true;

    if (this.router.url == '/games/casino') this.localStorageServ.setItem('casinoFilter', 'all');
    else if (this.router.url == '/games/live-casino') this.localStorageServ.setItem('casinoLiveFilter', 'all');
    else this.localStorageServ.setItem('virtualFilter', 'all');

  }

  getGamesByCategory(category: string) {
    this.casinoServ.namesr=''
    this.filterType.emit('category');
    this.isAllGames = false;

    if (this.router.url == '/games/live-casino' && category != '') {
      this.localStorageServ.setItem('casinoLiveFilter', category);
    } else if (this.router.url == '/games/casino' && category != '') {
      this.localStorageServ.setItem('casinoFilter', category);
    } else if (this.router.url == '/games/virtual' && category != '') {
      this.localStorageServ.setItem('virtualFilter', category);
    }

    if (this.router.url == '/games/live-casino') {
      this.casinoServ.getGamesByCategory(this.page, category, 'live casino').subscribe((res: any) => {
        this.gamesList.emit(res.message);
        this.casinoServ.listGames.next(res.message);
      })
    } else if (this.router.url == '/games/casino') {
      this.casinoServ.getGamesByCategory(this.page, category, 'casino').subscribe((res: any) => {
        this.gamesList.emit(res.message);
        this.casinoServ.listGames.next(res.message);
      })
    } else {
      this.casinoServ.getGamesByCategory(this.page, category, 'virtual').subscribe((res: any) => {
        this.gamesList.emit(res.message);
        this.casinoServ.listGames.next(res.message);
      })
    }
  }
}
