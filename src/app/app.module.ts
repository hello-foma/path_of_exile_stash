import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { LoginPageModule } from '../login-page/login-page.module';
import { ApiModule } from '../api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ApiModule,
    LoginPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
