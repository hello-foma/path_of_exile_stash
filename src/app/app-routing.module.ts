import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

export const AppRoutes = {
  login: 'login'
};

const routes: Routes = [
  {
    path: AppRoutes.login,
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: AppRoutes.login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
