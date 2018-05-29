import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FacilitatorOverviewComponent } from './facilitator-overview.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { TrainRatingComponent } from './train-rating/train-rating.component';

import { ConflictPipe } from '../shared/pipes/conflict.pipe';
import { MotivesHtmlPipe } from '../shared/pipes/motives-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    FacilitatorOverviewComponent,
    IconButtonComponent,
    TrainRatingComponent,
    ConflictPipe,
    MotivesHtmlPipe
  ],
  exports: [ FacilitatorOverviewComponent ]
})
export class FacilitatorOverviewModule { }
