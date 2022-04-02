import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from './showcase-page.component';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShowcasePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class ShowcasePageModule { }
