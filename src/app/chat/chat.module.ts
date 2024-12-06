import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';
import { ChatBallComponent } from './chat-ball/chat-ball.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ContactComponent,
    ChatBallComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    NgbModule
  ],
  exports: [
    ChatBallComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatModule { }
