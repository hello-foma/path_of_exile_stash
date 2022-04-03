import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, combineLatest, from, map, Observable, tap } from 'rxjs';
import { Stash } from '../api/stash.type';
import { Item } from '../api/item.type';

type LeagueFilter = {
  [league: string]: boolean
};

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {
  private searchStringEvent = new BehaviorSubject('');

  public filterByLeague = new BehaviorSubject<LeagueFilter>({});
  public stashes: Observable<Stash[]> = from(this.api.getFirstStash().then(({stashes}) => stashes));
  public leagueList: Observable<string[]> = from(this.initLeagueList());
  public filteredItems: Observable<Item[]> = this.initFilteredItems();
  public searchString = '';

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  private async initLeagueList(): Promise<string[]> {
    const leagues = await this.api.getLeagueList();

    const leagueFilter: LeagueFilter = {};
    const filterValues = leagues.reduce((list, league) => {
      list[league] = true;
      return list;
    }, leagueFilter);

    this.filterByLeague.next(filterValues);

    return leagues;
  }

  private initFilteredItems(): Observable<Item[]> {
    return combineLatest([
      this.stashes,
      this.searchStringEvent,
      this.filterByLeague
    ]).pipe(
      map(([stashes, searchString, filterByLeague]) => {
        const isNoLeaguesSelected = Object.keys(filterByLeague).length === 0;
        if (stashes === null || isNoLeaguesSelected) {
          return [];
        }

        const allItems = ([] as Item[]).concat(...stashes.map((stash) => stash.items))
        const filteredByLeague = allItems.filter((item) => filterByLeague[item.league])

        if (searchString.length === 0) {
          return filteredByLeague;
        }

        return filteredByLeague.filter((item) => {
          // todo: lowercase check
          const isByName = item.name.includes(searchString);
          const isByTypeLine = item.typeLine.includes(searchString);

          return isByName || isByTypeLine;
        });
      })
    );
  }

  public onSearchType(text: string) {
    this.searchStringEvent.next(text);
  }

  public onLeagueFilterChange(league: string, isActive: boolean) {
    const currentFilterValue = this.filterByLeague.getValue();

    currentFilterValue[league] = isActive;

    this.filterByLeague.next(currentFilterValue);
  }
}
