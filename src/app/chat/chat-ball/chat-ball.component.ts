import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-ball',
  templateUrl: './chat-ball.component.html',
  styleUrls: ['./chat-ball.component.scss']
})
export class ChatBallComponent implements OnInit {
  isBallClicked = false;
  constructor() { }

  ngOnInit(): void {
  }

  openChat() {
    this.isBallClicked = !this.isBallClicked;
  }

}
