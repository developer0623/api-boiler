import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { IUser } from '../shared/models';

@Component({
  selector: 'app-facilitator-overview',
  templateUrl: './facilitator-overview.component.html',
  styleUrls: ['./facilitator-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacilitatorOverviewComponent implements OnInit {
  @Input('user') user: IUser;
  @Input('orgAdmin') orgAdmin: boolean = false;
  @Input('facilitatorId') facilitatorId: string;
  @Input('facilitatorRating') facilitatorRating: number;
  @Input('facilitatorEvaluations') facilitatorEvaluations: number;
  @Input('trainedClasses') trainedClasses: number;
  @Input('trainedLearners') trainedLearners: number;
  @Input('orgToolkits') orgToolkits: number;
  @Input('orgSdiCredits') orgSdiCredits: number;
  @Input('platformKey') platformKey;

  @Output() regenPlatformKey: EventEmitter<any> = new EventEmitter<string>();
  @Output() copyPlatformKey: EventEmitter<any> = new EventEmitter<string>();
  @Output() showTransactions: EventEmitter<any> = new EventEmitter();

  public options = {
    position: ['middle', 'center'],
  };

  constructor(private _notifications: NotificationsService) { }

  public ngOnInit() {
    // Initialize input data
    this.user = this.user || {
      id: '',
      profileImages: {
        avatarUrl: '',
        monumentUrl: ''
      },
      firstName: '',
      lastName: '',
      jobTitle: '',
      emailAddress: '',
      assessments: {
        default: {
          createdAt: '',
          results: {
          }
        }
      }
    };
  }

  public copiedToClipboardAlert() {
    this._notifications.html(`Copied to clipboard!`, 'success', {
      clickToClose: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeOut: 2000,
      position: ['middle', 'center']
    });
    this.copyPlatformKey.emit(this.platformKey);
  }

  public reGenerate() {
    this._notifications.html(`Platform key has been re-generated!`, 'success', {
      clickToClose: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeOut: 2000,
      position: ['middle', 'center']
    });
    this.regenPlatformKey.emit(this.platformKey);
  }

  public onClickHerf() {

  }

  public onShowTranaction() {
    this.showTransactions.emit();
  }

}
