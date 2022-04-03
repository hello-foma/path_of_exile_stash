import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, combineLatest, from, map, Observable } from 'rxjs';
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

  private filterItemsByString(items: Item[], searchString: string): Item[] {
    const normalize = (s: string) => s.trim().toLowerCase();
    const normalizedSearchString = normalize(searchString);

    if (normalizedSearchString.length === 0) {
      return items;
    }

    return items.filter((item) => {
      const isByName = normalize(item.name).includes(normalizedSearchString);
      const isByTypeLine = normalize(item.typeLine).includes(normalizedSearchString);

      return isByName || isByTypeLine;
    });
  }

  private filterStashByLeague(stashes: Stash[], leagueFilter: LeagueFilter): Stash[] {
    const isNoLeaguesSelected = Object.keys(leagueFilter).length === 0;
    if (stashes === null || isNoLeaguesSelected) {
      return [];
    }

    return  stashes.filter((stash) => leagueFilter[stash.league]);
  }

  private initFilteredItems(): Observable<Item[]> {
    return combineLatest([
      this.stashes,
      this.searchStringEvent,
      this.filterByLeague
    ]).pipe(
      map(([stashes, searchString, filterByLeague]) => {
        const filteredStashes = this.filterStashByLeague(stashes, filterByLeague);
        const allItems = ([] as Item[]).concat(...filteredStashes.map((stash) => stash.items))

        return this.filterItemsByString(allItems, searchString);
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
