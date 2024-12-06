import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/core/models/message';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit{
  element1 = document.getElementById('ftr');
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: any;
  userId: string;
  username: string;
  message: string;
  fp: string;
  listMessages: Chat[] = []

  constructor(
    private localStorageServ: LocalstorageService,
    private socketServ: SocketService) { }

  ngOnInit() {
    this.userId = this.localStorageServ.getItem('userid');

    this.fp = this.localStorageServ.getItem('fp');
    this.username = this.localStorageServ.getItem('username');

    if (this.userId !== undefined && (this.userId !== null)) {
      this.getMessages();

      this.socketServ.getMessage.subscribe((data: any) => {
        this.listMessages = data;
        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      })
      this.socketServ.sendMessage.subscribe((msg: any) => {
        this.listMessages = msg;
        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      })
      this.socketServ.newMessage.subscribe((data: any) => {
        this.listMessages = data;

        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      })
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {

    try {

      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

    } catch (err) { }
  }

  getMessages() {
    this.messages = this.socketServ.getMesgs(this.userId, this.fp)
  }

  sendMessage(message: string) {
    this.socketServ.sendMessageSoc(this.userId, message)
    this.message = '';
  }


}
