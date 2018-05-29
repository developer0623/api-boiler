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

import { AppComponent as ALPHA } from '../app/ALPHA/src/app/app.component';
import { Sdi2Component } from '../app/ALPHA/src/app/pages/sdi-2/sdi-2.component';

import { ComponentsModule } from '../app/ALPHA/src/app/shared/components/components.module';
import { Sdi2Module } from '../app/ALPHA/src/app/pages/sdi-2/sdi-2.module';
import { MemberTableFilterComponent } from '../app/ALPHA/src/app/pages/sdi-2/member-table-filter/member-table-filter.component';
import { MemberTableComponent } from '../app/ALPHA/src/app/pages/sdi-2/member-table/member-table.component';
import { InviteRemindComponent } from '../app/ALPHA/src/app/pages/sdi-2/invite-remind/invite-remind.component';

import { InvitationComponent } from '../app/ALPHA/src/app/shared/components/invitation/invitation.component';
import { InvitationGridComponent } from '../app/ALPHA/src/app/shared/components/invitation-grid/invitation-grid.component';
import { OverviewComponent } from '../app/ALPHA/src/app/shared/components/overview/overview.component';
import { TransactionsComponent } from '../app/ALPHA/src/app/shared/components/transactions/transactions.component';

import { PipesModule } from '../app/ALPHA/src/app/shared/pipes/pipes.module';

import { TranslateService } from '../app/ALPHA/src/app/shared/services/translate.service';
import { CommonService } from '../app/ALPHA/src/app/shared/services/common.service';
import { DataSettingService } from '../app/ALPHA/src/app/core/services/data-setting.service';

storiesOf('ALPHA', module)
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
          component: Sdi2Component,
        },
        {
          path: '**',
          component: Sdi2Component,
        }]),
        NgbModule.forRoot(),
        MarkdownModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ALPHA,
        Sdi2Component
       ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        TranslateService,
        CommonService,
        DataSettingService
      ],
    })
  )
  .add('App', () => {
    return {
      component: ALPHA,
      moduleMetadata: {
        declarations: [
          InviteRemindComponent,
          MemberTableFilterComponent,
          MemberTableComponent,
          InvitationComponent,
          InvitationGridComponent,
          OverviewComponent,
          TransactionsComponent,
        ]
      }
    };
  })
  .add('Sdi2', () => {
    return {
      component: Sdi2Component,
      moduleMetadata: {
        declarations: [
          MemberTableFilterComponent,
          MemberTableComponent,
          InvitationComponent,
          InvitationGridComponent,
          InviteRemindComponent,
          OverviewComponent,
          TransactionsComponent,
        ]
      }
    };
  })
  .add('Invite Remind', () => {
    return {
      component: InviteRemindComponent,
      moduleMetadata: {
        imports: [
          ComponentsModule
        ],
        declarations: [
          MemberTableFilterComponent,
          MemberTableComponent
        ]
      }
    };
  })
  .add('Member Table Filter', () => {
    const filter = {
      names: '',
      members: 0,
      labels: ''
    };
    const filterChange = action('filterChange');
    return {
      props: {
        filter,
        filterChange
      },
      component: MemberTableFilterComponent,
    };
  })
  .add('Member Table', () => {
    const data = {
      rows: [
        {
          name: {
            firstName: 'Julie',
            lastName: 'Goff'
          },
          job: 'Recuriting Manager',
          status: {
            added: new Date('2017-9-28'),
          }
        },
        {
          name: {
            firstName: 'Steve',
            lastName: 'Patterson'
          },
          job: 'structual Engineer',
          status: {
            added: new Date('2017-9-28'),
          }
        },
        {
          name: {
            firstName: 'Julie',
            lastName: 'Patterson'
          },
          job: 'Director',
          status: {
            added: new Date('2017-9-28'),
          }
        },
        {
          name: {
            firstName: 'Tom',
            lastName: 'Patterson'
          },
          job: 'Director',
          status: {
            added: new Date('2017-9-28'),
          }
        }
      ],
      filter: {
        names: '',
        members: 0,
        labels: ''
      }
    };
    const hideEmail = text('hideEmail', 'false');
    return {
      props: {
        data,
        hideEmail
      },
      component: MemberTableComponent,
    };
  })
  .add('Invitation', () => {
    return {
      component: InvitationComponent,
    };
  })
  .add('Invitation Grid', () => {
    return {
      component: InvitationGridComponent,
    };
  })
  .add('Overview', () => {
    return {
      component: OverviewComponent,
    };
  })
  .add('Transactions', () => {
    return {
      component: TransactionsComponent,
    };
  })
  ;
