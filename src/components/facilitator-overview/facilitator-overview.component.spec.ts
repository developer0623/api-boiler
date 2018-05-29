import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../shared/test.module';
import { L10nLoader } from 'angular-l10n';

import { FacilitatorOverviewComponent } from './facilitator-overview.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { TrainRatingComponent } from './train-rating/train-rating.component';

import { ConflictPipe } from '../shared/pipes/conflict.pipe';
import { MotivesHtmlPipe } from '../shared/pipes/motives-html.pipe';
import { IUser } from '../shared/models';

describe('FacilitatorOverviewComponent', () => {
  let component: FacilitatorOverviewComponent;
  let fixture: ComponentFixture<FacilitatorOverviewComponent>;
  let l10nLoader: L10nLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [
        FacilitatorOverviewComponent,
        IconButtonComponent,
        TrainRatingComponent,
        ConflictPipe,
        MotivesHtmlPipe
      ]
    })
    .compileComponents();
    l10nLoader = TestBed.get(L10nLoader);
    l10nLoader.load();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitatorOverviewComponent);
    component = fixture.componentInstance;
    const testUser: IUser = {
      id: 'US12247',
      profileImages: {
        avatarUrl: 'assets/moon-lite-components/img/avatar/susan-anderson.png',
        monumentUrl: ''
      },
      firstName: 'Susan',
      lastName: 'Anderson',
      jobTitle: 'Director of HR',
      emailAddress: '',
      assessments: {
        default: {
          createdAt: new Date('2017-04-18'),
          results: {
            motivationalValueSystem: {
              color: 'HUB'
            },
            conflictSequence: {
              color: 'br_g'
            }
          }
        }
      }
    };
    component.user = testUser;
    component.orgAdmin = true;
    component.facilitatorId = 'US12247';
    component.facilitatorEvaluations = 346;
    component.facilitatorRating = 4.67;
    component.trainedClasses = 48;
    component.trainedLearners = 641;
    component.orgToolkits = 14;
    component.orgSdiCredits = 78;
    component.platformKey = 'ab89c2ba4f882267818edfb68a3c';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
