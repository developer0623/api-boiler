import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from './header/header.module';
import { FacilitatorOverviewModule } from './facilitator-overview/facilitator-overview.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FacilitatorOverviewModule
  ],
  exports: [
    HeaderModule,
    FacilitatorOverviewModule
  ],
  declarations: [

  ],
  entryComponents: []
})
export class ComponentsModule { }
