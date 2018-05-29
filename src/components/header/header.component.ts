import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  @Input() title?: string = '';
  @Input() subTitle?: string = '';
  @Input() stepsComplete?: string = '';
  @Input() stepsTotal?: string = '';
  @Input() backgroundColor?: 'white' | 'lightblue'| 'blue' | 'lightorange' | 'orange' | 'gradient' = 'white';
  @Input() nextIcon?: boolean = true;
  @Input() backIcon?: boolean = true;
  @Input() contextMenu?: boolean = false;
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

  onClickBack() {
    this.back.emit('back');
  }

  onClickNext() {
    this.next.emit('next');
  }

  getHeaderClasses() {
    this.backgroundColor = this.backgroundColor || 'white';
    return {
      'header-content': true,
      [this.backgroundColor]: true,
    };
  }

}
