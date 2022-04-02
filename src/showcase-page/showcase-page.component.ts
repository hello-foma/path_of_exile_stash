import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, combineLatest, from, map, Observable, of } from 'rxjs';
import { Stash } from '../api/stash.type';
import { AuthService } from '../api/auth.service';
import { Item } from '../api/item.type';

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {
  private user = this.auth.currentUser;
  private searchStringEvent = new BehaviorSubject('');

  public stash: Observable<Stash | null> = this.initStash();
  public filteredItems: Observable<Item[]> = this.initFilteredItems();
  public leagueList: Observable<string[]> = from(this.api.getLeagueList());
  public searchString = '';

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  private initStash(): Observable<Stash | null> {
    return from(this.user ? this.api.getStashForUser(this.user) : of(null));
  }

  private initFilteredItems(): Observable<Item[]> {
    return combineLatest([this.stash, this.searchStringEvent]).pipe(
      map(([stash, searchString]) => {
        if (stash === null) {
          return [];
        }

        if (searchString.length === 0) {
          return stash.items;
        }

        return stash.items.filter((item) => item.name.includes(searchString));
      })
    );
  }

  public onSearchType(text: string) {
    this.searchStringEvent.next(text);
  }
}
