import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpinterceptorInterceptor } from './core/interceptor/httpinterceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ChatModule } from './chat/chat.module';

const config: SocketIoConfig = { url: 'https://socket.easybet.tn', options: {} };

export function getToken() {
  return localStorage.getItem('tkGameEsy');
 }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    ChatModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorInterceptor,
      multi: true
    }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
