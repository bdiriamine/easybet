import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-connection-button',
  templateUrl: './connection-button.component.html',
  styleUrls: ['./connection-button.component.scss']
})
export class ConnectionButtonComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    // this.modalService.dismissAll()
    const modal: NgbModalRef = this.modalService.open(LoginComponent,{ modalDialogClass: 'modal-fullscreen' });
  }

}
