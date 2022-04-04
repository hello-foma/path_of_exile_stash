import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, from, map, Observable, shareReplay } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Stash } from '../api/stash.type';
import { Item } from '../api/item.type';
import { ApiService } from '../api/api.service';

type LeagueFilter = {
  [league: string]: boolean
};

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent {
  public searchString = '';
  public filterByLeague = new BehaviorSubject<LeagueFilter>({});
  public searchStringEvent = new BehaviorSubject('');
  public stashes: Observable<Stash[]> = from(this.api.getFirstStash().then(({stashes}) => stashes));
  public leagueList: Observable<string[]> = from(this.initLeagueList());
  public filteredItems: Observable<Item[]> = this.initFilteredItems().pipe(shareReplay(1));

  constructor(
    private api: ApiService,
  ) { }

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
        const filteredStashes = this.filterStashByLeague(stashes, filterByLeague);
        const allItems = ([] as Item[]).concat(...filteredStashes.map((stash) => stash.items))

        return this.filterItemsByString(allItems, searchString);
      })
    );
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

  public onSearchType(text: string) {
    this.searchStringEvent.next(text);
  }

  public onLeagueFilterChange(league: string, isActive: MatCheckboxChange) {
    const currentFilterValue = this.filterByLeague.getValue();

    currentFilterValue[league] = isActive.checked;

    this.filterByLeague.next(currentFilterValue);
  }
}
