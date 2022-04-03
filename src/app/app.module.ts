import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from '../api/api.module';
import { ShowcasePageModule } from '../showcase-page/showcase-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    ShowcasePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
