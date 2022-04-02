import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasePageComponent } from '../showcase-page/showcase-page.component';

export const AppRoutes = {
  showcase: 'showcase'
};

const routes: Routes = [
  {
    path: AppRoutes.showcase,
    component: ShowcasePageComponent
  },
  {
    path: '**',
    redirectTo: AppRoutes.showcase
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
