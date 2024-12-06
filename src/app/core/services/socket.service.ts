import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { Chat } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  balance: number;
  listMessages: Chat[];

  constructor(private socket: Socket) { }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.fromEvent('disconnect');
  }

  myOBSolde = Observable.create((observer: Observer<any>) => {
    this.socket.on('balance', (data: any) => {

      observer.next(data)
      this.balance = data.balance;
    });
  })

  newMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('NewMessage', (data: any) => {
      this.listMessages.push(data);
      observer.next(this.listMessages)
    });
  })

  sendMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('SendMessage', (data: any) => {
      this.getMessage.subscribe((d) => {
        this.listMessages = d;
      })
      observer.next(data)
    });
  })

  getMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('messages', (data: any) => {
      this.listMessages = data;
      observer.next(data)
    });
  })

  getBalance(fp: string, idUser: string) {
    this.socket.emit('Getbalance', { 'id': idUser, 'finger_print': fp });
    this.myOBSolde.subscribe((data: any) => {
      this.balance = data.balance
    });
  }

  getMesgs(idUser: string, fingerprint: string) {
    this.socket.emit('GetMessages', { 'id': idUser, 'finger_print': fingerprint });
  }

  sendMessageSoc(idUser: string, message: string) {
    this.socket.emit('SendMessage', { 'id': idUser, 'message': message });
  }
}
