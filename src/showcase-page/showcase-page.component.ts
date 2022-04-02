import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { from, Observable, of } from 'rxjs';
import { Stash } from '../api/stash.type';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {
  private user = this.auth.currentUser;
  public stash: Observable<Stash | null> = this.initStash();

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  private initStash(): Observable<Stash | null> {
    return from(this.user ? this.api.getStashForUser(this.user) : of(null));
  }

}
