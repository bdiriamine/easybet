import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-liste-proviers',
  templateUrl: './liste-proviers.component.html',
  styleUrls: ['./liste-proviers.component.scss']
})
export class ListeProviersComponent implements OnInit {
  @Input() providers: any[];
  @Output() providerChoosen = new EventEmitter<string>();

  showProviders = false
  listBestGames: any
  page: any = 0;
  totalIPages: any;
  addgrid: boolean;
  searchNameValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  async openProviders() {
    this.showProviders = !this.showProviders
  }

  goTOcasinoGames(provider: string) {
    this.providerChoosen.emit(provider);
  }

}

