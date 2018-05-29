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
import { QuillModule } from 'ngx-quill';

import { AppComponent as BRAVO } from '../app/BRAVO/src/app/app.component';
import { MainComponent } from '../app/BRAVO/src/app/pages/main/main.component';
import { InviteModalComponent } from '../app/BRAVO/src/app/shared/components/invite-modal/invite-modal.component';
import { ModalHeaderComponent } from '../app/BRAVO/src/app/shared/components/modal-header/modal-header.component';
import { FooterComponent } from '../app/BRAVO/src/app/shared/components/invite-modal/footer/footer.component';
import { RecipientComponent } from '../app/BRAVO/src/app/shared/components/invite-modal/recipient/recipient.component';
import { SdiResultComponent } from '../app/BRAVO/src/app/shared/components/invite-modal/sdi-result/sdi-result.component';
import { EmailMessageComponent } from '../app/BRAVO/src/app/shared/components/email-message/email-message.component';
import { SelectTemplateComponent } from '../app/BRAVO/src/app/shared/components/email-message/select-template/select-template.component';
import { SaveTemplateComponent } from '../app/BRAVO/src/app/shared/components/invite-modal/save-template/save-template.component';

import { MainModule } from '../app/BRAVO/src/app/pages/main/main.module';
import { ComponentsModule } from '../app/BRAVO/src/app/shared/components/components.module';
import { EmailMessageModule } from '../app/BRAVO/src/app/shared/components/email-message/email-message.module';
import { InviteModalModule } from '../app/BRAVO/src/app/shared/components/invite-modal/invite-modal.module';
import { ModalHeaderModule } from '../app/BRAVO/src/app/shared/components/modal-header/modal-header.module';
import { SdiResultModule } from '../app/BRAVO/src/app/shared/components/invite-modal/sdi-result/sdi-result.module';

import { TranslateService } from '../app/BRAVO/src/app/shared/services/translate.service';
import { CommonService } from '../app/BRAVO/src/app/shared/services/common.service';

storiesOf('BRAVO', module)
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
          component: MainComponent,
        },
        {
          path: '**',
          component: MainComponent,
        }]),
        NgbModule.forRoot(),
        FormsModule,
        QuillModule,
        ReactiveFormsModule,
        MainModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ BRAVO ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        TranslateService,
        CommonService
      ],
    })
  )
  .add('App', () => {
    return {
      component: BRAVO,
    };
  })
  .add('Main', () => {
    return {
      component: MainComponent,
      moduleMetadata: {
        imports: [ComponentsModule]
      }
    };
  })
  .add('Modal Header', () => {
    const type = text('type', 'invite');
    const title = text('title', 'inventory_guest_sdi_invite_title');
    const description = text('description', 'inventory_ guest_sdi_invite_text');
    return {
      component: ModalHeaderComponent,
      props: {
        type,
        title,
        description
      },
      moduleMetadata: {
        imports: [ModalHeaderModule]
      }
    };
  })
  .add('Invite Modal', () => {
    return {
      template: `<app-invite-modal></app-invite-modal>`,
      moduleMetadata: {
        imports: [InviteModalModule]
      }
    };
  })
  .add('SDI Result', () => {
    return {
      component: SdiResultComponent,
      moduleMetadata: {
        imports: [SdiResultModule]
      }
    };
  })
  .add('Save Template', () => {
    return {
      component: SaveTemplateComponent,
    };
  })
  .add('Footer', () => {
    return {
      component: FooterComponent,
    };
  })
  .add('Recipient', () => {
    const recipient = {
        username: {
          firstName: 'Catherine',
          lastName: 'Smith'
        },
        email: 'catherine.smith@organization.com',
        status: true
      };
    const index = number('index', 0);
    const onDelete = action('delete');
    return {
      props: {
        recipient,
        index,
        delete: onDelete,
      },
      component: RecipientComponent,
    };
  })
  .add('Email Message', () => {
    return {
      template: `<app-email-message></app-email-message>`,
      moduleMetadata: {
        imports: [EmailMessageModule]
      }
    };
  })
  .add('Select Template', () => {
    const isOpenAppLabel = boolean('isOpenAppLabel', false);
    return {
      props: {
        isOpenAppLabel
      },
      component: SelectTemplateComponent,
    };
  })
  ;
