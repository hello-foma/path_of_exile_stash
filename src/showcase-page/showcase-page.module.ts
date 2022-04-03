import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from './showcase-page.component';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    ShowcasePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule
  ]
})
export class ShowcasePageModule { }
