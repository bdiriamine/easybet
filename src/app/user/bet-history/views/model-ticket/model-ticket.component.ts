import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model-ticket',
  templateUrl: './model-ticket.component.html',
  styleUrls: ['./model-ticket.component.scss']
})
export class ModelTicketComponent implements OnInit {
  @Input() urlTicket: string
  @ViewChild('iframe') iframe: ElementRef<HTMLInputElement>;
  urlIfram: any;
  image = "https://easybet.tn/assets/sportbgcp.webp"
  constructor(config: NgbModalConfig, public activeModal: NgbActiveModal, private _sanitizationService: DomSanitizer,) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getCoupon()
   
  }
  openFullscreen() {
    this.iframe.nativeElement.requestFullscreen();
  }
  getCoupon(){
    this.urlIfram = this._sanitizationService.bypassSecurityTrustResourceUrl(this.urlTicket);
  }
}
