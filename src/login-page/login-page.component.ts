import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { from, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'pes-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  public logins: Observable<string[]> = from(this.authService.getLoginSuggest());

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLoginTry(form: NgForm) {
    const {login} = form.value;

    console.info(login);
  }
}
