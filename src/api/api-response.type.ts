import { Stash } from './stash.type';

export type ApiResponse = {
  next_change_id: string;
  stashes: Stash[]
}
