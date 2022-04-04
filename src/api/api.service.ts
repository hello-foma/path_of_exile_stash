import { Injectable } from '@angular/core';

import { ApiResponse } from './api-response.type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * http get request
   * @param query
   * @private
   */
  private static get<T>(query: string): Promise<T> {
    // todo: error handling
    return fetch(query)
      .then(response => response.json())
  }

  /**
   * Get first stash from server
   */
  public getFirstStash(): Promise<ApiResponse> {
    const query = '_limit=1';
    const path = envVars.apiUrl + '?' + query;

    // todo: filter corrupted data
    return ApiService.get<ApiResponse[]>(path).then(data => data[0]);
  }

  /**
   * Get list of leagues, based on first stash
   */
  public async getLeagueList(): Promise<string[]> {
    // todo: cache stash request or specify query
    const stashes = await this.getFirstStash();

    const leagueNames = new Map<string, null>();

    stashes.stashes.forEach((stash) => {
      if (stash.league === null) {
        return;
      }

      leagueNames.set(stash.league, null);
    });

    return Array.from(leagueNames.keys());
  }
}
