import { CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs/angular';
import { action, configureActions } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// styles
import '../styles.scss';

import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd party libraries
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocaleValidationModule,
} from 'angular-l10n';
import { initL10n, l10nConfig } from './ln10.helper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-md';
import {
  UnusedCreditsTable,
  FakeUnusedCreditsTable,
  FakeUnusedCreditsTableB,
  FakeUpcomingClassesTabTable,
  FakeUser,
  FakeLearnersAttendingUpcomingClassTable,
  FakeClassRosterLearnerReportTypeTable
} from '../app/FOXTROT/src/app/shared/models';

import {
  CommonService,
  ColorizeMvsCsService
} from '../app/FOXTROT/src/app/shared/services';

import { SharedModule } from '../app/FOXTROT/src/app/shared/shared.module';
import { MainClassModule } from '../app/FOXTROT/src/app/train/main-class/main-class.module';
import {
  UpcomingPreviousClassDetailModule
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/upcoming-previous-class-detail.module';
import { ClassFormModule } from '../app/FOXTROT/src/app/train/class-form/class-form.module';
import { OrganizationSummaryModule } from '../app/FOXTROT/src/app/train/organization-summary/organization-summary.module';

import { AppComponent as FOXTROT } from '../app/FOXTROT/src/app/app.component';
import { TrainComponent } from '../app/FOXTROT/src/app/train/train.component';
import { OverviewComponent } from '../app/FOXTROT/src/app/train/overview/overview.component';
import { CreditToolkitPolicyComponent } from '../app/FOXTROT/src/app/train/credit-toolkit-policy/credit-toolkit-policy.component';
import { CreateManagementTeamComponent } from '../app/FOXTROT/src/app/train/create-management-team/create-management-team.component';
import { RelationshipImpactComponent } from '../app/FOXTROT/src/app/train/relationship-impact/relationship-impact.component';
import { EditManagementTeamComponent } from '../app/FOXTROT/src/app/train/edit-management-team/edit-management-team.component';

import { MainClassComponent } from '../app/FOXTROT/src/app/train/main-class/main-class.component';
import {
  UpcomingPreviousClassesTabTableComponent
} from '../app/FOXTROT/src/app/train/main-class/upcoming-previous-classes-tab-table/upcoming-previous-classes-tab-table.component';
import { ReschedulingComponent } from '../app/FOXTROT/src/app/train/main-class/rescheduling/rescheduling.component';
import {
  LearnersToBeRescheduledTableComponent
} from '../app/FOXTROT/src/app/train/main-class/rescheduling/learners-to-be-rescheduled-table/learners-to-be-rescheduled-table.component';
import {
  UpcomingClassesTableComponent
} from '../app/FOXTROT/src/app/train/main-class/rescheduling/upcoming-classes-table/upcoming-classes-table.component';
import { UnusedCreditsComponent } from '../app/FOXTROT/src/app/train/main-class/unused-credits/unused-credits.component';
import {
  UnusedCreditsTableComponent
} from '../app/FOXTROT/src/app/train/main-class/unused-credits/unused-credits-table/unused-credits-table.component';

import { ClassFormComponent } from '../app/FOXTROT/src/app/train/class-form/class-form.component';
import { InPersonClassComponent } from '../app/FOXTROT/src/app/train/class-form/in-person-class/in-person-class.component';
import { VirtualClassComponent } from '../app/FOXTROT/src/app/train/class-form/virtual-class/virtual-class.component';
import { VirtualClassModule } from '../app/FOXTROT/src/app/train/class-form/virtual-class/virtual-class.module';
import {
  ClassSessionFormComponent
} from '../app/FOXTROT/src/app/train/class-form/virtual-class/class-session-form/class-session-form.component';

import { OrganizationSummaryComponent } from '../app/FOXTROT/src/app/train/organization-summary/organization-summary.component';
import { ConflictComponent } from '../app/FOXTROT/src/app/train/organization-summary/conflict/conflict.component';
import { MotivesComponent } from '../app/FOXTROT/src/app/train/organization-summary/motives/motives.component';
import { StrengthsComponent } from '../app/FOXTROT/src/app/train/organization-summary/strengths/strengths.component';

import {
  UpcomingPreviousClassDetailComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/upcoming-previous-class-detail.component';
import { AddLearnerComponent } from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/add-learner/add-learner.component';
import {
  ClassRosterLearnerReportTypeComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/class-roster-learner-report-type/class-roster-learner-report-type.component';
import {
  ClassRosterTeamReportTypeComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/class-roster-team-report-type/class-roster-team-report-type.component';
import {
  EvaluationRemindersTabViewComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/evaluation-reminders-tab-view/evaluation-reminders-tab-view.component';
import {
  EvaluationsTabViewComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/evaluations-tab-view/evaluations-tab-view.component';
import {
  LearnersAttendingUpcomingClassTableComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/learners-attending-upcoming-class-table/learners-attending-upcoming-class-table.component';
import {
  TopClassDetailContainerComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/top-class-detail-container/top-class-detail-container.component';
import {
  UpcomingInvitationsRemindersTableComponent
} from '../app/FOXTROT/src/app/train/upcoming-previous-class-detail/upcoming-invitations-reminders-table/upcoming-invitations-reminders-table.component';

import { ConflictBarComponent } from '../app/FOXTROT/src/app/shared/components/conflict-bar/conflict-bar.component';
import { DeleteClassAlertModalComponent } from '../app/FOXTROT/src/app/shared/components/delete-class-alert-modal/delete-class-alert-modal.component';
import { IconButtonComponent } from '../app/FOXTROT/src/app/shared/components/icon-button/icon-button.component';
import { CommonTooltipComponent } from '../app/FOXTROT/src/app/shared/components/popovers/common-tooltip/common-tooltip.component';
import {
  EvaluationRemindersThreeDotPopoverComponent
} from '../app/FOXTROT/src/app/shared/components/popovers/evaluation-reminders-three-dot-popover/evaluation-reminders-three-dot-popover.component';
import { ThreeDotPopoverComponent } from '../app/FOXTROT/src/app/shared/components/popovers/three-dot-popover/three-dot-popover.component';
import { ToolkitTypePopoverComponent } from '../app/FOXTROT/src/app/shared/components/popovers/toolkit-type-popover/toolkit-type-popover.component';
import { PspActionsDropdownComponent } from '../app/FOXTROT/src/app/shared/components/psp-actions-dropdown/psp-actions-dropdown.component';
import { TabsContainerComponent } from '../app/FOXTROT/src/app/shared/components/tabs-container/tabs-container.component';
import { ToolkitsAlertModalComponent } from '../app/FOXTROT/src/app/shared/components/toolkits-alert-modal/toolkits-alert-modal.component';
import { VerticalAlphabetLetterListComponent } from '../app/FOXTROT/src/app/shared/components/vertical-alphabet-letter-list/vertical-alphabet-letter-list.component';
import { ViewEncapsulation } from '@angular/compiler/src/core';

storiesOf('FOXTROT', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        LocaleValidationModule.forRoot(),
        RouterModule.forRoot([{
          path: 'iframe.html',
          component: TrainComponent,
        },
        {
          path: '**',
          component: TrainComponent,
        }]),
        NgbModule.forRoot(),
        MarkdownModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        FOXTROT,
        TrainComponent
       ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        CommonService,
        ColorizeMvsCsService
      ],
    })
  )
  .add('App', () => {
    return {
      component: FOXTROT,
      moduleMetadata: {
        imports: [
          SharedModule,
          MainClassModule,
          UpcomingPreviousClassDetailModule,
          ClassFormModule,
          OrganizationSummaryModule
        ],
        declarations: [
          OverviewComponent,
          CreditToolkitPolicyComponent,
          CreateManagementTeamComponent,
          RelationshipImpactComponent,
          EditManagementTeamComponent
        ]
      }
    };
  })
  .add('Class Form', () => {
    const isEdit = boolean('isEdit', false);
    const onback = action('onback');
    const gotoCreditToolkitPolicy = action('gotoCreditToolkitPolicy');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-class-form [isEdit]="isEdit" (onback)="onback" (gotoCreditToolkitPolicy)="gotoCreditToolkitPolicy"></app-class-form>
        </div>`,
      props: {
        isEdit,
        onback,
        gotoCreditToolkitPolicy
      },
      moduleMetadata: {
        imports: [
          VirtualClassModule
        ],
        declarations: [
          ClassFormComponent,
          InPersonClassComponent
        ]
      }
    };
  })
  .add('InPersonClassComponent', () => {
    const isEdit = boolean('isEdit', false);
    const onclick = action('onclick');
    const openDeleteClassModal = action('openDeleteClassModal');
    const changeClassDeliveryMethod = action('changeClassDeliveryMethod');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-in-person-class [isEdit]="isEdit" (onclick)="onclick" (openDeleteClassModal)="openDeleteClassModal"
            (changeClassDeliveryMethod)="changeClassDeliveryMethod">
          </app-in-person-class>
        </div>`,
      props: {
        isEdit,
        onclick,
        openDeleteClassModal,
        changeClassDeliveryMethod
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          InPersonClassComponent
        ]
      }
    };
  })
  .add('Virtual Class', () => {
    const isEdit = boolean('isEdit', false);
    const openForm = boolean('openForm', true);
    const onclick = action('onclick');
    const openDeleteClassModal = action('openDeleteClassModal');
    const changeClassDeliveryMethod = action('changeClassDeliveryMethod');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-virtual-class [isEdit]="isEdit" [openForm]="openForm"></app-virtual-class>
        </div>`,
      props: {
        isEdit,
        openForm,
        onclick,
        openDeleteClassModal,
        changeClassDeliveryMethod
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          VirtualClassComponent,
          ClassSessionFormComponent
        ]
      }
    };
  })
  .add('ClassSessionFormComponent', () => {
    const classData = {
      facilitatorName: {
        firstName: 'Susan',
        lastName: 'Anderson'
      },
      facilitatorEmail: 'susan.anderson@corestrengths.com',
      coFacilitatorNames: [],
      coFacilitatorEmails: [],
      toolkitType: '',
      classType: '',
      classLanguage: '',
      className: '',
      groupName: '',
      classLocation: '',
      timezone: '',
      classStartDate: new Date(),
      classEndDate: new Date(),
      sdiPreworkDueDate: new Date(),
      allowLearnerToAccessResultsPriorToClass: false
    };
    const sessionNumber = number('sessionNumber', 0);
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-class-session-form [classData]="classData" [sessionNumber]="sessionNumber"></app-class-session-form>
        </div>`,
      props: {
        classData,
        sessionNumber
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          ClassSessionFormComponent
        ]
      }
    };
  })
  .add('CreateManagementTeamComponent', () => {
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-create-management-team></app-create-management-team>
        </div>`,
      moduleMetadata: {
        declarations: [
          CreateManagementTeamComponent
        ]
      }
    };
  })
  .add('CreditToolkitPolicyComponent', () => {
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-credit-toolkit-policy onback="onback"></app-credit-toolkit-policy>
        </div>`,
      moduleMetadata: {
        declarations: [
          CreditToolkitPolicyComponent
        ]
      },
      props: {
        onback: action('onback')
      }
    };
  })
  .add('EditManagementTeamComponent', () => {
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-edit-management-team></app-edit-management-team>
        </div>`,
      moduleMetadata: {
        declarations: [
          EditManagementTeamComponent
        ]
      }
    };
  })
  .add('Main Class', () => {
    const gotoClassDetail = action('gotoClassDetail');
    const gotoCreditToolkitPolicy = action('gotoCreditToolkitPolicy');
    const gotoClassForm = action('gotoClassForm');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-main-class></app-main-class>
        </div>`,
      props: {
        gotoClassDetail,
        gotoCreditToolkitPolicy,
        gotoClassForm
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          MainClassComponent,
          UpcomingPreviousClassesTabTableComponent,
          UnusedCreditsComponent,
          ReschedulingComponent
        ]
      }
    };
  })
  .add('Rescheduling', () => {
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-rescheduling></app-rescheduling>
        </div>`,
      props: {
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          ReschedulingComponent,
          LearnersToBeRescheduledTableComponent,
          UpcomingClassesTableComponent
        ]
      }
    };
  })
  .add('LearnersToBeRescheduledTableComponent', () => {
    const tableData = FakeUnusedCreditsTable;
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-learners-to-be-rescheduled-table [tableData]="tableData"></app-learners-to-be-rescheduled-table>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          LearnersToBeRescheduledTableComponent
        ]
      }
    };
  })
  .add('UpcomingClassesTableComponent', () => {
    const onclick = action('onclick');
    const tableData = FakeUnusedCreditsTableB;
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-upcoming-classes-table [tableData]="tableData"></app-upcoming-classes-table>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UpcomingClassesTableComponent
        ]
      }
    };
  })
  .add('Unused Credits', () => {
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-unused-credits></app-unused-credits>
        </div>`,
      props: {
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UnusedCreditsComponent,
          UnusedCreditsTableComponent
        ]
      }
    };
  })
  .add('UnusedCreditsTableComponent', () => {
    const onclick = action('onclick');
    const tableData = FakeUnusedCreditsTable;
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-unused-credits-table [tableData]="tableData"></app-unused-credits-table>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UnusedCreditsTableComponent
        ]
      }
    };
  })
  .add('UpcomingPreviousClassesTabTableComponent', () => {
    const onclick = action('onclick');
    const selectedClassInformationTab = text('selectedClassInformationTab', 'train_upcoming_classes');
    const tableData = FakeUpcomingClassesTabTable;
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-upcoming-previous-classes-tab-table [tableData]="tableData"
            [selectedClassInformationTab]="selectedClassInformationTab">
          </app-upcoming-previous-classes-tab-table>
        </div>`,
      props: {
        tableData,
        selectedClassInformationTab,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UpcomingPreviousClassesTabTableComponent
        ]
      }
    };
  })
  .add('Organization Summary', () => {
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-organization-summary></app-organization-summary>
        </div>`,
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          OrganizationSummaryComponent,
          MotivesComponent,
          ConflictComponent,
          StrengthsComponent
        ]
      }
    };
  })
  .add('ConflictComponent', () => {
    const leftMemberCount = number('leftMemberCount', 6754);
    const rightMemberCount = number('rightMemberCount', 6754);
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-conflict [leftMemberCount]="leftMemberCount" rightMemberCount="rightMemberCount"></app-conflict>
        </div>`,
      props: {
        leftMemberCount,
        rightMemberCount
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          ConflictComponent
        ]
      }
    };
  })
  .add('MotivesComponent', () => {
    const motives = [
      {
        text: 'blue',
        percentage: 12
      },
      {
        text: 'red',
        percentage: 18
      },
      {
        text: 'green',
        percentage: 10
      },
      {
        text: 'hub',
        percentage: 25
      },
      {
        text: 'blue-green',
        percentage: 12
      },
      {
        text: 'red-green',
        percentage: 15
      },
      {
        text: 'red-blue',
        percentage: 8
      }
    ];
    const totalMemberCount = number('totalMemberCount', 9555);
    const sdiMemberCount = number('sdiMemberCount', 6754);
    const pendingSdiInvitationCount = number('pendingSdiInvitationCount', 742);
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-motives [motives]="motives" [totalMemberCount]="totalMemberCount"
            [sdiMemberCount]="sdiMemberCount" [pendingSdiInvitationCount]="pendingSdiInvitationCount">
          </app-motives>
        </div>`,
      props: {
        motives,
        totalMemberCount,
        sdiMemberCount,
        pendingSdiInvitationCount
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          MotivesComponent
        ]
      }
    };
  })
  .add('StrengthsComponent', () => {
    const memberCount = number('memberCount', 6754);
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-strengths [memberCount]="memberCount"></app-strengths>
        </div>`,
      props: {
        memberCount
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          StrengthsComponent
        ]
      }
    };
  })
  .add('OverviewComponent', () => {
    const user = FakeUser;
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-overview [user]="user"></app-overview>
        </div>`,
      props: {
        user
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          OverviewComponent
        ]
      }
    };
  })
  .add('RelationshipImpactComponent', () => {
    const relationshipImpacts = number('relationshipImpacts', 7908);
    const sdiCompletedNumber = number('sdiCompletedNumber', 6754);
    const sdiPendingNumber = number('sdiPendingNumber', 742);
    const feedbackCompletedNumber = number('feedbackCompletedNumber', 14125);
    const feedbackPendingNumber = number('feedbackPendingNumber', 1129);
    const roleExpectationNumber = number('roleExpectationNumber', 7754);
    const roleExpectationPendingNumber = number('roleExpectationPendingNumber', 346);
    return {
      template: `
        <div class="foxtrot-main-style">
          <app-relationship-impact [relationshipImpacts]="relationshipImpacts" [sdiCompletedNumber]="sdiCompletedNumber" [sdiPendingNumber]="sdiPendingNumber"
          [feedbackCompletedNumber]="feedbackCompletedNumber" [feedbackPendingNumber]="feedbackPendingNumber"
          [roleExpectationNumber]="roleExpectationNumber" [roleExpectationPendingNumber]="roleExpectationPendingNumber">
          </app-relationship-impact>
        </div>`,
      props: {
        relationshipImpacts,
        sdiCompletedNumber,
        sdiPendingNumber,
        feedbackCompletedNumber,
        feedbackPendingNumber,
        roleExpectationNumber,
        roleExpectationPendingNumber
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          RelationshipImpactComponent
        ]
      }
    };
  })
  .add('Upcoming Previous Class Detail', () => {
    const selectedClassData = {
      className: 'Talent Development',
      facilitatorName: {
        firstName: 'Susan',
        lastName: 'Anderson'
      },
      groupName: 'HR',
      classDate: new Date('2017-10-12'),
      classLocation: 'New York City, NY',
      total: 27,
      incomplete: 27,
      deadlineDate: new Date('2017-10-11'),
      deadlineRemainingDays: 12,
      cspSyncStatus: true
    };
    const selectedClassInformationTab = 'train_upcoming_classes';
    const onback = action('onback');
    const openEditClass = action('openEditClass');

    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-upcoming-previous-class-detail [selectedClassData]="selectedClassData"
            [selectedClassInformationTab]="selectedClassInformationTab">
          </app-upcoming-previous-class-detail>
        </div>`,
      props: {
        selectedClassData,
        selectedClassInformationTab,
        onback,
        openEditClass
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UpcomingPreviousClassDetailComponent,
          TopClassDetailContainerComponent,
          AddLearnerComponent,
          LearnersAttendingUpcomingClassTableComponent,
          UpcomingInvitationsRemindersTableComponent,
          ClassRosterLearnerReportTypeComponent,
          ClassRosterTeamReportTypeComponent,
          EvaluationsTabViewComponent,
          EvaluationRemindersTabViewComponent
        ]
      }
    };
  })
  .add('AddLearnerComponent', () => {
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-add-learner></app-add-learner>
        </div>`,
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          AddLearnerComponent
        ]
      }
    };
  })
  .add('ClassRosterLearnerReportTypeComponent', () => {
    const tableData = FakeClassRosterLearnerReportTypeTable;
    const currentAction = { title: 'Download Roster - PDF' };
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-class-roster-learner-report-type [tableData]="tableData" [currentAction]="currentAction"></app-class-roster-learner-report-type>
        </div>`,
      props: {
        tableData,
        currentAction,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          ClassRosterLearnerReportTypeComponent
        ]
      }
    };
  })
  .add('ClassRosterTeamReportTypeComponent', () => {
    const tableData = FakeClassRosterLearnerReportTypeTable;
    const currentAction = { title: 'Download Roster - PDF' };
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-class-roster-team-report-type [tableData]="tableData" [currentAction]="currentAction"></app-class-roster-team-report-type>
        </div>`,
      props: {
        tableData,
        currentAction,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          ClassRosterTeamReportTypeComponent
        ]
      }
    };
  })
  .add('EvaluationRemindersTabViewComponent', () => {
    const tableData = FakeLearnersAttendingUpcomingClassTable;
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-evaluation-reminders-tab-view [tableData]="tableData"></app-evaluation-reminders-tab-view>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          EvaluationRemindersTabViewComponent
        ]
      }
    };
  })
  .add('EvaluationsTabViewComponent', () => {
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-evaluations-tab-view></app-evaluations-tab-view>
        </div>`,
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          EvaluationsTabViewComponent
        ]
      }
    };
  })
  .add('LearnersAttendingUpcomingClassTableComponent', () => {
    const tableData = FakeLearnersAttendingUpcomingClassTable;
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-learners-attending-upcoming-class-table [tableData]="tableData"></app-learners-attending-upcoming-class-table>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          LearnersAttendingUpcomingClassTableComponent
        ]
      }
    };
  })
  .add('TopClassDetailContainerComponent', () => {
    const selectedClassData = {
      className: 'Talent Development',
      facilitatorName: {
        firstName: 'Susan',
        lastName: 'Anderson'
      },
      groupName: 'HR',
      classDate: new Date('2017-10-12'),
      classLocation: 'New York City, NY',
      total: 27,
      incomplete: 27,
      deadlineDate: new Date('2017-10-11'),
      deadlineRemainingDays: 12,
      cspSyncStatus: true
    };
    const selectedClassInformationTab = 'train_upcoming_classes';
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-top-class-detail-container [selectedClassInformationTab]="selectedClassInformationTab"
            [selectedClassData]="selectedClassData">
          </app-top-class-detail-container>
        </div>`,
      props: {
        selectedClassData,
        selectedClassInformationTab
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          TopClassDetailContainerComponent
        ]
      }
    };
  })
  .add('UpcomingInvitationsRemindersTableComponent', () => {
    const tableData = FakeLearnersAttendingUpcomingClassTable;
    const onclick = action('onclick');
    return {
      template: `
        <div class="foxtrot-main-style font-body-color">
          <app-upcoming-invitations-reminders-table [tableData]="tableData"></app-upcoming-invitations-reminders-table>
        </div>`,
      props: {
        tableData,
        onclick
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          SharedModule
        ],
        declarations: [
          UpcomingInvitationsRemindersTableComponent
        ]
      }
    };
  })
  .add('ConflictBarComponent', () => {
    const conflictBar = {
      barColor: 'green',
      mixedText: 'GREEN = Analyze',
      percentage: 29
    };
    return {
      props: {
        conflictBar
      },
      component: ConflictBarComponent
    };
  })
  .add('IconButtonComponent', () => {
    const iconUrl = text('iconUrl', 'assets/images/icons/train-re-gen.svg');
    const content = text('content', 'test');
    const onclick = action('onclick');
    return {
      props: {
        iconUrl,
        content,
        onclick
      },
      component: IconButtonComponent
    };
  })
  .add('CommonTooltipComponent', () => {
    const tooltipText = text('tooltipText', 'test');
    return {
      template: `
        <div class="foxtrot-tooltip">
          <app-common-tooltip [tooltipText]="tooltipText"></app-common-tooltip>
        </div>`,
      props: {
        tooltipText
      },
      moduleMetadata: {
        declarations: [
          CommonTooltipComponent
        ]
      }
    };
  })
  .add('EvaluationRemindersThreeDotPopoverComponent', () => {
    return {
      template: `
        <div class="foxtrot-popover">
          <app-evaluation-reminders-three-dot-popover></app-evaluation-reminders-three-dot-popover>
        </div>`,
      moduleMetadata: {
        declarations: [
          EvaluationRemindersThreeDotPopoverComponent
        ]
      }
    };
  })
  .add('ThreeDotPopoverComponent', () => {
    return {
      template: `
        <div class="foxtrot-popover">
          <app-three-dot-popover></app-three-dot-popover>
        </div>`,
      moduleMetadata: {
        declarations: [
          ThreeDotPopoverComponent
        ]
      }
    };
  })
  .add('ToolkitTypePopoverComponent', () => {
    const toolkitType = number('toolkitType', 1);
    return {
      template: `
        <div class="foxtrot-popover">
          <app-toolkit-type-popover [toolkitType]="toolkitType"></app-toolkit-type-popover>
        </div>`,
      props: {
        toolkitType
      },
      moduleMetadata: {
        declarations: [
          ToolkitTypePopoverComponent
        ]
      }
    };
  })
  .add('PspActionsDropdownComponent', () => {
    const isLarge = boolean('isLarge', true);
    const isCheckBoxDropdown = boolean('isCheckBoxDropdown', true);
    const title = text('title', 'test');
    const dropdownActions = [
      { title: 'Cindy Capello' },
      { title: 'Frank Brown' },
      { title: 'Cristopher Thompson' }
    ];
    return {
      props: {
        isLarge,
        isCheckBoxDropdown,
        title,
        dropdownActions
      },
      component: PspActionsDropdownComponent
    };
  })
  .add('TabsContainerComponent', () => {
    const tabs = [
      'train_upcoming_classes',
      'train_previous_text',
      'train_unused_credits',
      'train_rescheduling_text'
    ];
    return {
      props: {
        tabs
      },
      component: TabsContainerComponent
    };
  })
  .add('VerticalAlphabetLetterListComponent', () => {
    return {
      component: VerticalAlphabetLetterListComponent
    };
  })
  ;
