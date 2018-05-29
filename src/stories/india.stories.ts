import { CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, Component } from '@angular/core';
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

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent as INDIA } from '../app/INDIA/src/app/app.component';
import { VideoModalComponent } from '../app/INDIA/src/app/modals/video-modal/video-modal.component';
import { ResetConfirmComponent } from '../app/INDIA/src/app/modals/reset-confirm/reset-confirm.component';
import { VideoPlayerComponent } from '../app/INDIA/src/app/components/video-player/video-player.component';
import { TransferConfirmationComponent } from '../app/INDIA/src/app/components/transfer-confirmation/transfer-confirmation.component';
import { TrainingComponent } from '../app/INDIA/src/app/components/training/training.component';
import { ToolkitLearnerComponent } from '../app/INDIA/src/app/components/toolkit-learner/toolkit-learner.component';
import { ToolkitFacilitatorComponent } from '../app/INDIA/src/app/components/toolkit-facilitator/toolkit-facilitator.component';
import { HeaderComponent } from '../app/INDIA/src/app/components/header/header.component';
import { ContactHeaderComponent } from '../app/INDIA/src/app/components/contact-header/contact-header.component';
import { ToolAccByChoiceComponent } from '../app/INDIA/src/app/components/tool-acc-by-choice/tool-acc-by-choice.component';
import { ToolResThroughRelComponent } from '../app/INDIA/src/app/components/tool-res-through-rel/tool-res-through-rel.component';
import { TableVideosComponent } from '../app/INDIA/src/app/components/table-videos/table-videos.component';
import { TableResourcesComponent } from '../app/INDIA/src/app/components/table-resources/table-resources.component';
import { CertAccByChoiceComponent } from '../app/INDIA/src/app/components/cert-acc-by-choice/cert-acc-by-choice.component';
import { CertResThroughRelComponent } from '../app/INDIA/src/app/components/cert-res-through-rel/cert-res-through-rel.component';
import { OrganizationsTreeComponent } from '../app/INDIA/src/app/components/organizations-tree/organizations-tree.component';
import { NavigationComponent } from '../app/INDIA/src/app/components/navigation/navigation.component';
import { GettingStartedComponent } from '../app/INDIA/src/app/components/getting-started/getting-started.component';
import { CreditToolkitsComponent } from '../app/INDIA/src/app/components/credit-toolkits/credit-toolkits.component';
import { CollapsibleChecklistComponent } from '../app/INDIA/src/app/components/collapsible-checklist/collapsible-checklist.component';
import { TableCustomComponent } from '../app/INDIA/src/app/components/collapsible-checklist/table-custom/table-custom.component';
import {
  TableChecklistComponent
} from '../app/INDIA/src/app/components/collapsible-checklist/table-checklist/table-checklist.component';
import {
  AccountResultsSharingComponent
} from '../app/INDIA/src/app/components/account-results-sharing/account-results-sharing.component';
import {
  AccountsRelatedDetailsComponent
} from '../app/INDIA/src/app/components/accounts-related-details/accounts-related-details.component';
import { AccountSettingsComponent } from '../app/INDIA/src/app/components/account-settings/account-settings.component';
import { AccountRolesComponent } from '../app/INDIA/src/app/components/account-roles/account-roles.component';
import { AccountRelatedComponent } from '../app/INDIA/src/app/components/account-related/account-related.component';
import { AccountOrganizationComponent } from '../app/INDIA/src/app/components/account-organization/account-organization.component';

import { AppModule } from '../app/INDIA/src/app/app.module';

import { ColorizeMvsCsService } from '../app/INDIA/src/app/services/colorize-mvs-cs-service.service';
import { CreditTransferService } from '../app/INDIA/src/app/services/credit-transfer.service';

@Component({
  selector: 'app-mock-component',
  template: ``
}) class MockComponent {}

storiesOf('INDIA', module)
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
          component: MockComponent,
        },
        {
          path: '**',
          component: MockComponent,
        }]),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MockComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        ColorizeMvsCsService,
        CreditTransferService,
        NgbActiveModal
      ],
    })
  )
  .add('App', () => {
    return {
      component: INDIA,
      moduleMetadata: {
        imports: [AppModule]
      }
    };
  })
  .add('Video Modal', () => {
    const videoID = text('videoID', 'jc1z3nfpzv');
    return {
      props: {
        videoID
      },
      component: VideoModalComponent,
      moduleMetadata: {
        declarations: [VideoPlayerComponent]
      }
    };
  })
  .add('Reset Confirm', () => {
    return {
      component: ResetConfirmComponent,
    };
  })
  .add('Video Player', () => {
    return {
      component: VideoPlayerComponent,
    };
  })
  .add('Transfer Confirmation', () => {
    return {
      component: TransferConfirmationComponent,
    };
  })
  .add('Training', () => {
    return {
      component: TrainingComponent,
      moduleMetadata: {
        declarations: [
          HeaderComponent,
          ContactHeaderComponent,
          ToolAccByChoiceComponent,
          ToolResThroughRelComponent,
          CertAccByChoiceComponent,
          CertResThroughRelComponent
        ]
      }
    };
  })
  .add('Toolkit Learner', () => {
    return {
      component: ToolkitLearnerComponent,
    };
  })
  .add('Toolkit Facilitator', () => {
    return {
      component: ToolkitFacilitatorComponent,
    };
  })
  .add('Tool Res Through Rel', () => {
    return {
      component: ToolResThroughRelComponent,
      moduleMetadata: {
        declarations: [
          HeaderComponent,
          TableVideosComponent,
          TableResourcesComponent,
          VideoModalComponent,
          VideoPlayerComponent
        ],
        entryComponents: [
          VideoModalComponent,
          VideoPlayerComponent
        ]
      }
    };
  })
  .add('Tool Acc By Choice', () => {
    return {
      component: ToolAccByChoiceComponent,
    };
  })
  .add('Table Videos', () => {
    const items = [
      {title: 'train_download_install_platform', description: 'train_how_to_technology', url: '-'},
      {title: 'train_activating_platform', description: 'train_how_to_activate', url: '-'},
    ];
    const title = text('title', 'train_platform_instruction_videos');
    const hasSection = text('hasSection', 'false');
    return {
      props: {
        items,
        title,
        hasSection
      },
      component: TableVideosComponent,
      moduleMetadata: {
        declarations: [
          VideoModalComponent,
          VideoPlayerComponent
        ],
        entryComponents: [
          VideoModalComponent,
          VideoPlayerComponent
        ]
      }
    };
  })
  .add('Table Resources', () => {
    const items = [
      {title: 'train_csr_solutions_overview', description: 'train_csr_solutions_overview_text', url: '-'},
      {title: 'train_overview_video', description: 'train_csr_video_explaining', url: '-'}
    ];
    const title = text('title', 'train_training_impact');
    return {
      props: {
        items,
        title
      },
      component: TableResourcesComponent,
    };
  })
  .add('Organizations Tree', () => {
    const org = {name: 'ExxonMobil - Global One', organizations: []};
    const hasMultiple = text('hasMultiple', 'false');
    return {
      props: {
        org,
        hasMultiple
      },
      component: OrganizationsTreeComponent,
    };
  })
  .add('Navigation', () => {
    return {
      component: NavigationComponent,
    };
  })
  .add('Header', () => {
    const sectionChanged = action('sectionChanged');
    return {
      props: {sectionChanged},
      component: HeaderComponent,
    };
  })
  .add('Getting Started', () => {
    return {
      component: GettingStartedComponent,
      moduleMetadata: {
        declarations: [
          ToolkitLearnerComponent,
          ToolkitFacilitatorComponent,
        ]
      }
    };
  })
  .add('Credit Toolkits', () => {
    const transferTo = {name: 'ExxonMobil - Global One', organizations: []};
    return {
      component: CreditToolkitsComponent,
    };
  })
  .add('Contact Header', () => {
    return {
      component: ContactHeaderComponent,
    };
  })
  .add('Collapsible Checklist', () => {
    return {
      component: CollapsibleChecklistComponent,
      moduleMetadata: {
        declarations: [
          TableCustomComponent,
          TableChecklistComponent,
          VideoModalComponent,
          VideoPlayerComponent
        ],
        entryComponents: [
          VideoModalComponent,
          VideoPlayerComponent
        ]
      }
    };
  })
  .add('Table Custom', () => {
    const data = {
      description: 'train_download_assessment_results',
      title: 'train_sdi_20_long',
      header: ['train_active_version', 'profile_date_text', 'navigation_motives',
        'navigation_conflict', 'navigation_strengths', 'common_text_download'],
      items: [
        [
          ['text', 'SDI 2.0'],
          ['text', '18 April 2017'],
          ['colorize', 'HUB'],
          ['colorize-conflicts', '[BR]-G'],
          ['list', ['Inclusive', 'Flexible', 'Risk Taking']],
          ['download', 'www.google.com']
        ]
      ]
    };
    return {
      props: {data},
      component: TableCustomComponent,
    };
  })
  .add('Table Checklist', () => {
    const data = {
      title: 'train_facilitator_videos',
      items: []
    };
    const type = 'videos';
    return {
      props: {data, type},
      component: TableChecklistComponent,
    };
  })
  .add('Cert Res Through Rel', () => {
    return {
      component: CertResThroughRelComponent,
    };
  })
  .add('Cert Acc By Choice', () => {
    return {
      component: CertAccByChoiceComponent,
      moduleMetadata: {
        declarations: [
          GettingStartedComponent,
          CollapsibleChecklistComponent,
          VideoModalComponent,
          VideoPlayerComponent,
          ToolkitLearnerComponent,
          ToolkitFacilitatorComponent
        ],
        entryComponents: [
          VideoModalComponent,
          VideoPlayerComponent
        ]
      }
    };
  })
  .add('Accounts Related Details', () => {
    return {
      component: AccountsRelatedDetailsComponent,
      moduleMetadata: {
        declarations: [
          CreditToolkitsComponent,
          AccountResultsSharingComponent
        ]
      }
    };
  })
  .add('Account Settings', () => {
    return {
      component: AccountSettingsComponent,
      moduleMetadata: {
        declarations: [
          AccountRelatedComponent,
          AccountRolesComponent,
          AccountOrganizationComponent
        ]
      }
    };
  })
  .add('Account Roles', () => {
    return {
      component: AccountRolesComponent,
    };
  })
  .add('Account Results Sharing', () => {
    return {
      component: AccountResultsSharingComponent,
    };
  })
  .add('Account Related', () => {
    return {
      component: AccountRelatedComponent,
      moduleMetadata: {
        declarations: [
          OrganizationsTreeComponent
        ]
      }
    };
  })
  .add('Account Organization', () => {
    return {
      component: AccountOrganizationComponent,
      moduleMetadata: {
        declarations: [
          VideoModalComponent,
          VideoPlayerComponent
        ],
        entryComponents: [
          VideoModalComponent,
          VideoPlayerComponent
        ]
      }
    };
  })
  ;
