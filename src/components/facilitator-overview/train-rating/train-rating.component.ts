import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-train-rating',
  templateUrl: './train-rating.component.html',
  styleUrls: ['./train-rating.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainRatingComponent implements OnInit {
  @Input('rate') rate: number = 0;
  @Input('state') state: boolean = false;
  constructor() { }

  ngOnInit() { }
  trackByIndex(index: number) {
    return index;
  }

}
