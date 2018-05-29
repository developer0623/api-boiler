import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconButtonComponent implements OnInit {
  @Input() iconUrl;
  @Input() content;
  @Output() onclick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }

  public onClick(event: any) {
    this.onclick.emit(event);
  }
}
