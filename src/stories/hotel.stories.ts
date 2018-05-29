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

import { AppComponent as HOTEL } from '../app/HOTEL/src/app/app.component';
import { DownloadComponent } from '../app/HOTEL/src/app/download/download.component';
import {
  ConversationToolsTableComponent
} from '../app/HOTEL/src/app/download/conversation-tools-table/conversation-tools-table.component';
import { GrayHeaderComponent } from '../app/HOTEL/src/app/download/gray-header/gray-header.component';
import { MeetingToolsTableComponent } from '../app/HOTEL/src/app/download/meeting-tools-table/meeting-tools-table.component';
import { MessageToolsTableComponent } from '../app/HOTEL/src/app/download/message-tools-table/message-tools-table.component';
import { SdiTableComponent } from '../app/HOTEL/src/app/download/sdi-table/sdi-table.component';
import { StrengthDownloadComponent } from '../app/HOTEL/src/app/download/strength-download/strength-download.component';
import { FacilitatorsComponent } from '../app/HOTEL/src/app/facilitators/facilitators.component';
import { ClassTableComponent } from '../app/HOTEL/src/app/facilitators/class-table/class-table.component';
import { FacilitatorDetailComponent } from '../app/HOTEL/src/app/facilitators/facilitator-detail/facilitator-detail.component';
import {
  FacilitatorInformationComponent
} from '../app/HOTEL/src/app/facilitators/facilitator-information/facilitator-information.component';
import { FacilitatorListComponent } from '../app/HOTEL/src/app/facilitators/facilitator-list/facilitator-list.component';
import { FacilitatorOverviewComponent } from '../app/HOTEL/src/app/facilitators/facilitator-overview/facilitator-overview.component';
import { UpcomingPreviousComponent } from '../app/HOTEL/src/app/facilitators/upcoming-previous/upcoming-previous.component';
import { InboxComponent } from '../app/HOTEL/src/app/inbox/inbox.component';
import { AlertMessageComponent } from '../app/HOTEL/src/app/inbox/alert-message/alert-message.component';
import { BadgeComponent } from '../app/HOTEL/src/app/inbox/badge/badge.component';
import { ConnectionsReceivedComponent } from '../app/HOTEL/src/app/inbox/connections-received/connections-received.component';
import { ConnectionsSentComponent } from '../app/HOTEL/src/app/inbox/connections-sent/connections-sent.component';
import { FilterComponent } from '../app/HOTEL/src/app/inbox/filter/filter.component';
import { InvitationsReceivedComponent } from '../app/HOTEL/src/app/inbox/invitations-received/invitations-received.component';
import { InvitationsSentComponent } from '../app/HOTEL/src/app/inbox/invitations-sent/invitations-sent.component';
import { PagingComponent } from '../app/HOTEL/src/app/shared/paging/paging.component';
import { ReceivedSentComponent } from '../app/HOTEL/src/app/inbox/received-sent/received-sent.component';
import { TabPageHeaderComponent } from '../app/HOTEL/src/app/inbox/tab-page-header/tab-page-header.component';
import { FilterSearchbarComponent } from '../app/HOTEL/src/app/shared/filter-searchbar/filter-searchbar.component';
import { CertRibbonComponent } from '../app/HOTEL/src/app/shared/cert-ribbon/cert-ribbon.component';
import { TrainRatingComponent } from '../app/HOTEL/src/app/shared/train-rating/train-rating.component';

import { ConflictSequencePipe } from '../app/HOTEL/src/app/pipes/conflict-sequence.pipe';
import { ConflictPipe } from '../app/HOTEL/src/app/pipes/conflict.pipe';
import { MotivesHtmlPipe } from '../app/HOTEL/src/app/pipes/motives-html.pipe';

import { FacilitatorService } from '../app/HOTEL/src/app/providers/facilitator.service';
import { UserService } from '../app/HOTEL/src/app/providers/user.service';

storiesOf('HOTEL', module)
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
          component: InboxComponent,
        },
        {
          path: '**',
          component: InboxComponent,
        }]),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        HOTEL,
        InboxComponent,
        MotivesHtmlPipe,
        ConflictSequencePipe,
        ConflictPipe
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        UserService,
        FacilitatorService
      ],
    })
  )
  .add('App', () => {
    return {
      component: HOTEL,
      moduleMetadata: {
        declarations: [
          AlertMessageComponent,
          BadgeComponent,
          InboxComponent,
          AlertMessageComponent,
          ReceivedSentComponent,
          TabPageHeaderComponent,
          ConnectionsSentComponent,
          ConnectionsReceivedComponent,
          InvitationsSentComponent,
          InvitationsReceivedComponent,
          FilterSearchbarComponent,
          FilterComponent,
          PagingComponent
        ]
      }
    };
  })
  .add('Inbox', () => {
    return {
      component: InboxComponent,
      moduleMetadata: {
        declarations: [
          BadgeComponent,
          InboxComponent,
          AlertMessageComponent,
          ReceivedSentComponent,
          TabPageHeaderComponent,
          ConnectionsSentComponent,
          ConnectionsReceivedComponent,
          InvitationsSentComponent,
          InvitationsReceivedComponent,
          FilterSearchbarComponent,
          FilterComponent,
          PagingComponent
        ],
        exports: [InboxComponent]
      }
    };
  })
  .add('Alert Message', () => {
    const Close = action('Close');
    return {
      props: { Close },
      component: AlertMessageComponent,
    };
  })
  .add('Badge', () => {
    const count = number('count', 999);
    return {
      props: { count },
      component: BadgeComponent,
    };
  })
  .add('Connections Received', () => {
    return {
      component: ConnectionsReceivedComponent,
    };
  })
  .add('Connections Sent', () => {
    return {
      component: ConnectionsSentComponent,
    };
  })
  .add('Filter', () => {
    return {
      component: FilterComponent,
    };
  })
  .add('Invitations Received', () => {
    return {
      component: InvitationsReceivedComponent,
    };
  })
  .add('Invitations Sent', () => {
    return {
      component: InvitationsSentComponent,
    };
  })
  .add('Paging', () => {
    return {
      component: PagingComponent,
    };
  })
  .add('Received Sent', () => {
    const state = number('state', 0);
    return {
      props: { state },
      component: ReceivedSentComponent,
      moduleMetadata: {
        declarations: [
          FilterSearchbarComponent,
          TabPageHeaderComponent,
          FilterComponent,
          InvitationsReceivedComponent,
          InvitationsSentComponent
        ]
      }
    };
  })
  .add('Tab Page Header', () => {
    return {
      component: TabPageHeaderComponent,
    };
  })
  .add('Table Header', () => {
    const state = number('state', 0);
    const OpenFilter = action('OpenFilter');
    return {
      props: {
        state,
        OpenFilter
      },
      component: FilterSearchbarComponent,
    };
  })
  .add('Download', () => {
    return {
      component: DownloadComponent,
      moduleMetadata: {
        declarations: [
          DownloadComponent,
          GrayHeaderComponent,
          SdiTableComponent,
          StrengthDownloadComponent,
          MeetingToolsTableComponent,
          MessageToolsTableComponent,
          ConversationToolsTableComponent,
          ConflictPipe,
          MotivesHtmlPipe
        ]
      }
    };
  })
  .add('Conversation Tools Table', () => {
    return {
      component: ConversationToolsTableComponent,
    };
  })
  .add('Gray Header', () => {
    const title = text('title', 'discover_sections_reasons_walkthrough_title');
    return {
      props: { title },
      component: GrayHeaderComponent,
    };
  })
  .add('Meeting Tools Table', () => {
    const downloads = [{type: 'common_text_monument'}, {type: 'common_text_name_tent'}, {type: 'common_text_name_badge'}];
    return {
      props: { downloads },
      component: MeetingToolsTableComponent,
    };
  })
  .add('Message Tools Table', () => {
    const downloads = [
      {description: 'profile_text_email_signature', imgUrl: 'assets/icons/triangle.svg', example: 'example'},
      {description: 'profile_text_outlook_addin', imgUrl: 'assets/icons/outlook.svg'},
      {description: 'profile_text_skype', imgUrl: 'assets/icons/skype.svg'},
      {description: 'profile_text_slack', imgUrl: 'assets/icons/slack.svg'},
      {description: 'profile_text_microsoft', imgUrl: 'assets/icons/microsoft_teams_logo.svg'}
    ];
    return {
      props: { downloads },
      component: MessageToolsTableComponent,
    };
  })
  .add('Sdi Table', () => {
    return {
      component: SdiTableComponent,
    };
  })
  .add('Strength Download', () => {
    const downloads = [
      {
        type: '360', provider: 'Mark Logan', date: '2017-04-18T00:00:00-06:00', strengths: [
          'navigation_strengths_inclusive', 'navigation_strengths_flexible', 'navigation_strengths_risk_taking'
        ]
      },
      {
        type: '360', provider: 'Janice lee', date: '2016-01-07T00:00:00-06:00', strengths: [
          'navigation_strengths_inclusive', 'navigation_strengths_caring', 'navigation_strengths_sociable'
        ]
      },
      {
        type: '360', provider: 'Amy Chang', date: '2014-06-22T00:00:00-06:00', strengths: [
          'navigation_strengths_caring', 'navigation_strengths_inclusive', 'navigation_strengths_flexible'
        ]
      }
    ];
    return {
      props: { downloads },
      component: StrengthDownloadComponent,
    };
  })
  .add('Class Table', () => {
    const items = [{
      type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
      date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
    },
    {
      type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
      date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
    },
    {
      type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
      date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
    }];
    return {
      props: { items },
      component: ClassTableComponent,
    };
  })
  .add('Facilitator Detail', () => {
    const id = text('id', 'US12247');
    return {
      props: { id },
      component: FacilitatorDetailComponent,
      moduleMetadata: {
        declarations: [
          CertRibbonComponent,
          FacilitatorsComponent,
          UpcomingPreviousComponent,
          ClassTableComponent,
          FacilitatorOverviewComponent,
          FacilitatorInformationComponent,
          ConflictSequencePipe,
          MotivesHtmlPipe,
          FacilitatorListComponent,
          FacilitatorDetailComponent,
          TrainRatingComponent
        ]
      }
    };
  })
  .add('Facilitator Information', () => {
    return {
      component: FacilitatorInformationComponent,
    };
  })
  .add('Facilitator List', () => {
    return {
      component: FacilitatorListComponent,
      moduleMetadata: {
        declarations: [
          FacilitatorInformationComponent,
          FacilitatorListComponent,

        ]
      }
    };
  })
  .add('Facilitator Overview', () => {
    const facilitator = {
      id: 'US12247', name: 'Cindy Capello', job_title: 'HR Benefits Admin', profile: 'assets/img/teams/profile.png',
      state: 'PREMIER', rating: 4.35, motives: 'blue', conflicts: 'b_r_g', evalutions_count: 125, trained_count: 17, learners_count: 312,
      toolkits_count: 14, credits_count: 30, certifications: [{name: 'CSA', isVerified: true}, {name: 'CSR', isVerified: true}],
      upcoming_classes: [{
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      }],
      previous_classes: [{
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      }]
    };
    return {
      props: { facilitator },
      component: FacilitatorOverviewComponent,
      moduleMetadata: {
        declarations: [
          CertRibbonComponent
        ]
      }
    };
  })
  .add('Upcoming Previous', () => {
    const facilitator = {
      id: 'US12247', name: 'Cindy Capello', job_title: 'HR Benefits Admin', profile: 'assets/img/teams/profile.png',
      state: 'PREMIER', rating: 4.35, motives: 'blue', conflicts: 'b_r_g', evalutions_count: 125, trained_count: 17, learners_count: 312,
      toolkits_count: 14, credits_count: 30, certifications: [{name: 'CSA', isVerified: true}, {name: 'CSR', isVerified: true}],
      upcoming_classes: [{
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      }],
      previous_classes: [{
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSA', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      },
      {
        type: 'CSR', name: "Designer's test certification", group_name: 'Design Team', location: 'Detroit, MI',
        date: '2018-04-30T00:00:00-06:00', count: 30, incompleted: 12
      }]
    };
    return {
      props: { facilitator },
      component: UpcomingPreviousComponent,
      moduleMetadata: {
        declarations: [ClassTableComponent]
      }
    };
  })
  .add('Cert Ribbon', () => {
    const state = text('state', 'PREMIER');
    const certs = [{name: 'CSA', isVerified: true}, {name: 'CSR', isVerified: true}];
    return {
      props: {
        state,
        certs
      },
      component: CertRibbonComponent,
    };
  })
  .add('Train Rating', () => {
    const rate = number('rate', 4);
    return {
      props: { rate },
      component: TrainRatingComponent,
      moduleMetadata: {
        declarations: [TrainRatingComponent],
        exports: [TrainRatingComponent]
      }
    };
  })
  ;
