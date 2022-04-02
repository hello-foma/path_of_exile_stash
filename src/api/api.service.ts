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

  public async getStashForUser(userName: string): Promise<Stash | null> {
    const stashes = await this.getFirstStash();

    const userStash = stashes.stashes.find((stash) => stash.accountName === userName);

    return userStash || null;
  }
}
