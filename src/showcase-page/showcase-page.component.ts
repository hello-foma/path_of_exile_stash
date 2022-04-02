import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Item } from 'src/api/item.type';

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {

  public items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
