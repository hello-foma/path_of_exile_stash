import { Item } from './item.type';

export type Stash = {
  id: string,
  league: string,
  accountName: string,
  items: Item[]
};
