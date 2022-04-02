import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiResponse } from './api-response.type';
import { Stash } from 'src/api/stash.type';

@Injectable()
export class ApiService {

  constructor() { }

  private static get<T>(query: string): Promise<T> {
    // todo: error handling
    return fetch(query)
      .then(response => response.json())
  }

  public getFirstStash(): Promise<ApiResponse> {
    const query = '_limit=1';
    const path = environment.apiUrl + '?' + query;

    // todo: filter corrupted data
    return ApiService.get<ApiResponse[]>(path).then(data => data[0]);
  }

  public async getLeagueList(): Promise<string[]> {
    const stashes = await this.getFirstStash();

    const leagueNames = new Map<string, null>();

    stashes.stashes.forEach((stash) => leagueNames.set(stash.league, null));

    return Array.from(leagueNames.keys());
  }
}
