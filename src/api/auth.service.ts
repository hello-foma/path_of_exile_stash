import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) { }

  /**
   * Get possible login values
   */
  public async getLoginSuggest(): Promise<string[]> {
    const stashes = await this.api.getFirstStash();
    const logins = new Map<string, boolean>();
    stashes.stashes.forEach((stash) => logins.set(stash.accountName, true));

    return Array.from(logins.keys());
  }
}
