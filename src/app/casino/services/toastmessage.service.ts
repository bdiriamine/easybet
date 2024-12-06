import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastmessageService {

  constructor(private toastrService: ToastrService) {

  }
  cnxmessage() {
    this.toastrService.info(('Vous devez être connecté pour ouvrir le jeu'), 'Warning');
  }

  warning(title: string, message: string){
    this.toastrService.warning(message, title);
  }
}

