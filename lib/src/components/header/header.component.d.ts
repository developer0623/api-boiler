import { OnInit, EventEmitter } from '@angular/core';
export declare class HeaderComponent implements OnInit {
    title?: string;
    subTitle?: string;
    stepsComplete?: string;
    stepsTotal?: string;
    backgroundColor?: 'white' | 'lightblue' | 'blue' | 'lightorange' | 'orange' | 'gradient';
    nextIcon?: boolean;
    backIcon?: boolean;
    contextMenu?: boolean;
    back: EventEmitter<any>;
    next: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    onClickBack(): void;
    onClickNext(): void;
    getHeaderClasses(): {
        [x: string]: boolean;
        'header-content': boolean;
    };
}
