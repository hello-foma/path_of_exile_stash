import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from './showcase-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ShowcasePageComponent
  }
];

@NgModule({
  declarations: [
    ShowcasePageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ShowcasePageModule { }
