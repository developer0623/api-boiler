import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MarkdownModule } from 'ngx-md';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule,
    SharedModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
