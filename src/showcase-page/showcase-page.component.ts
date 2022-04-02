import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, combineLatest, from, map, Observable } from 'rxjs';
import { Stash } from '../api/stash.type';
import { Item } from '../api/item.type';

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {
  private searchStringEvent = new BehaviorSubject('');

  public stashes: Observable<Stash[]> = from(this.api.getFirstStash().then(({stashes}) => stashes));
  public filteredItems: Observable<Item[]> = this.initFilteredItems();
  public leagueList: Observable<string[]> = from(this.api.getLeagueList());
  public searchString = '';

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  private initFilteredItems(): Observable<Item[]> {
    return combineLatest([this.stashes, this.searchStringEvent]).pipe(
      map(([stashes, searchString]) => {
        if (stashes === null) {
          return [];
        }

        const allItems = ([] as Item[]).concat(...stashes.map((stash) => stash.items))

        if (searchString.length === 0) {
          return allItems;
        }

        return allItems.filter((item) => item.name.includes(searchString));
      })
    );
  }

  public onSearchType(text: string) {
    this.searchStringEvent.next(text);
  }
}
