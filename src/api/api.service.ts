import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor() { }

  private static get<T>(query: string): Promise<T> {
    // todo: error handling
    return fetch(query)
      .then(response => response.json())
  }

  public getFirstStash(): Promise<any> {
    const query = '_limit=1';
    const path = environment.apiUrl + '?' + query;

    return this.get(query);
  }
}
