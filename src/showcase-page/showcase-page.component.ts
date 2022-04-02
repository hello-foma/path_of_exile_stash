import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'pes-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
