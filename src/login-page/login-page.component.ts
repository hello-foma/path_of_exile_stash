import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { from, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../app/app-routing.module';


@Component({
  selector: 'pes-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  public logins: Observable<string[]> = from(this.authService.getLoginSuggest());

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onLoginTry (form: NgForm) {
    const {login} = form.value;

    try {
      await this.authService.login(login);

      this.router.navigate([AppRoutes.showcase]);
    } catch (err) {
      // todo: handle error
      console.error(err);
    }
  }
}
