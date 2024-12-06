import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CasinoService } from '../../services/casino.service';

@Component({
  selector: 'app-modal-providers',
  templateUrl: './modal-providers.component.html',
  styleUrls: ['./modal-providers.component.scss']
})
export class ModalProvidersComponent implements OnInit {

  @Input() providers: any[];
  @Output() providerName = new EventEmitter<string>();

  @Output() providerChoosen = new EventEmitter<string>();
  @Output() panel: EventEmitter<boolean> = new EventEmitter();
  @Output() rendred: EventEmitter<boolean> = new EventEmitter();
  provider_name: string = '';
  saveProvidersList: any[];

  constructor(
    public activeModal: NgbActiveModal,
    private casinoGameServ: CasinoService,
    private localStorageServ: LocalstorageService,
    private toasterServ: ToastrService) {
    this.rendred.emit(true)
    document.body.style.overflow = 'hidden';
  }

  ngOnInit(): void {
  }

  var: any
  search(val: any) {
    if (this.providers.length > 1) {
      if (val.target.value !== '' || val.target.value !== undefined) this.var = this.providers.find(res => res.name.toLowerCase() == val.target.value)
      else this.providers = this.saveProvidersList;
      if (this.var !== undefined) {
        this.saveProvidersList = this.providers;
        this.providers = [];
        this.providers.push(this.var);
      } else this.toasterServ.error('Error', 'Please provide a correct provider name')
    } else {
      if (val.target.value !== '' || val.target.value !== null) this.var = this.saveProvidersList.find(res => res.name.toLowerCase() == val.target.value)
      if (this.var !== undefined) {
        this.providers = [];
        this.providers.push(this.var);
      } else this.toasterServ.error('Error', 'Please provide a correct provider name')      
    }
  }

  showAll(){
    this.providers = this.saveProvidersList;
  }

  closePanel() {
    this.panel.emit(false)
  }

  filteerByProvider(provider: string) {
    this.localStorageServ.setItem("casinoLiveFilter", "all")
    this.localStorageServ.setItem("casinoFilter", "all")
    this.localStorageServ.setItem("virtualFilter", "all")
    this.casinoGameServ.namesr = ''
    this.providerName.emit(provider)
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }
}
