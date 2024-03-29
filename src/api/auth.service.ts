import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  private authUser: string | null = null;

  public get currentUser(): string | null {
    return this.authUser;
  }

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

  /**
   * Login user
   * check if login is correct
   * if no - throws error
   * todo: cache first stash
   * @param login
   */
  public async login(login: string): Promise<boolean> {
    const possibleLogins = await this.getLoginSuggest();

    const isLoginExist = possibleLogins.some((stash) => stash === login);

    if (isLoginExist) {
      this.authUser = login;
      return true;
    }

    throw new Error('Wrong login');
  }
}
