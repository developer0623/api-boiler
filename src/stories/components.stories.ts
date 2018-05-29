import { CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs/angular';
import { action, configureActions } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// styles
import '../styles.scss';

import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
import { ClipboardModule } from 'ngx-clipboard';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { HeaderComponent } from '../components/header/header.component';
import { FacilitatorOverviewComponent } from '../components/facilitator-overview/facilitator-overview.component';
import { IconButtonComponent } from '../components/facilitator-overview/icon-button/icon-button.component';
import { TrainRatingComponent } from '../components/facilitator-overview/train-rating/train-rating.component';
import { ConflictPipe } from '../components/shared/pipes/conflict.pipe';
import { MotivesHtmlPipe } from '../components/shared/pipes/motives-html.pipe';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        LocaleValidationModule.forRoot(),
        RouterModule.forRoot([{
          path: 'iframe.html',
          component: HeaderComponent,
        },
        {
          path: '**',
          component: HeaderComponent,
        }]),
        NgbModule.forRoot(),
        MarkdownModule.forRoot(),
        ClipboardModule,
        SimpleNotificationsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        HeaderComponent
       ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
      ],
    })
  )
  .add('Header', () => {
    const next = action('next');
    const back = action('back');
    const title = text('title', 'inventory_guest_sdi_invite_title');
    const subTitle = text('subTitle', 'inventory_guest_sdi_invite_text');
    const withMarkdown = boolean('withMarkdown', false);
    const stepsTotal = text('stepsTotal', '6');
    const stepsComplete = text('stepsComplete', '3');
    const backgroundColor = text('backgroundColor', 'lightorange');
    const nextIcon = boolean('nextIcon', true);
    const backIcon = boolean('backIcon', true);
    const contextMenu = boolean('contextMenu', true);

    return {
      props: {
        next,
        back,
        title,
        subTitle,
        stepsTotal,
        stepsComplete,
        backgroundColor,
        nextIcon,
        backIcon,
        contextMenu,
      },
      component: HeaderComponent,
    };
  })
  .add('FacilitatorOverview', () => {
    const regenPlatformKey = action('regenPlatformKey');
    const copyPlatformKey = action('copyPlatformKey');
    const showTransactions = action('showTransactions');
    const orgAdmin = boolean('orgAdmin', true);
    const facilitatorId = text('facilitatorId', 'US12247');
    const facilitatorRating = number('facilitatorRating', 4.67);
    const facilitatorEvaluations = number('facilitatorEvaluations', 346);
    const trainedClasses = number('trainedClasses', 48);
    const trainedLearners = number('trainedLearners', 641);
    const orgToolkits = number('orgToolkits', 14);
    const orgSdiCredits = number('orgSdiCredits', 78);
    const platformKey = text('platformKey', 'ab89c2ba4f882267818edfb68a3c');
    const user = {
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

    return {
      props: {
        regenPlatformKey,
        copyPlatformKey,
        showTransactions,
        orgAdmin,
        facilitatorId,
        facilitatorRating,
        facilitatorEvaluations,
        trainedClasses,
        trainedLearners,
        orgToolkits,
        orgSdiCredits,
        platformKey,
        user
      },
      component: FacilitatorOverviewComponent,
      moduleMetadata: {
        declarations: [
          IconButtonComponent,
          TrainRatingComponent,
          ConflictPipe,
          MotivesHtmlPipe
        ]
      }
    };
  })
  ;
