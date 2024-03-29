import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowcasePageComponent } from '../showcase-page/showcase-page.component';

const routes: Routes = [
  {
    path: '**',
    component: ShowcasePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
