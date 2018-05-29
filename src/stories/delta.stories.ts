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

import { AppComponent as DELTA } from '../app/DELTA/src/app/app.component';
import { OverviewComponent as DELTAIOverviewComponent } from '../app/DELTA/src/app/pages/account/billing/overview/overview.component';
import { PagesComponent } from '../app/DELTA/src/app/pages/pages.component';
import { InventoryComponent as InventoryComponentDELTA } from '../app/DELTA/src/app/pages/inventory/inventory.component';
import { RemindTableFilterComponent } from '../app/DELTA/src/app/pages/inventory/remind-table-filter/remind-table-filter.component';
import { RemindTableComponent } from '../app/DELTA/src/app/pages/inventory/remind-table/remind-table.component';
import { AccountComponent } from '../app/DELTA/src/app/pages/account/account.component';
import { BillingComponent } from '../app/DELTA/src/app/pages/account/billing/billing.component';
import {
  CreditCardsTableComponent
} from '../app/DELTA/src/app/pages/account/billing/payment-methods/credit-cards-table/credit-cards-table.component';
import {
  AddCreditCardComponent
} from '../app/DELTA/src/app/pages/account/billing/payment-methods/add-credit-card/add-credit-card.component';
import { PlanOverviewComponent } from '../app/DELTA/src/app/pages/account/billing/overview/plan-overview/plan-overview.component';
import { HistoryTableComponent } from '../app/DELTA/src/app/pages/account/billing/history/history-table/history-table.component';
import { HistoryFilterComponent } from '../app/DELTA/src/app/pages/account/billing/history/history-filter/history-filter.component';
import { EmailFrequencyComponent } from '../app/DELTA/src/app/pages/account/billing/contact/email-frequency/email-frequency.component';
import { ContactTableComponent } from '../app/DELTA/src/app/pages/account/billing/contact/contact-table/contact-table.component';
import { AddContactComponent } from '../app/DELTA/src/app/pages/account/billing/contact/add-contact/add-contact.component';
import { ContactPspComponent } from '../app/DELTA/src/app/pages/account/contact-psp/contact-psp.component';
import { EditCardComponent } from '../app/DELTA/src/app/pages/account/edit-card/edit-card.component';

import { AddContactFormComponent } from '../app/DELTA/src/app/shared/components/add-contact-form/add-contact-form.component';
import { ContactFormComponent } from '../app/DELTA/src/app/shared/components/contact-form/contact-form.component';
import { ContactUsComponent } from '../app/DELTA/src/app/shared/components/contact-us/contact-us.component';
import { CreditCardFormComponent } from '../app/DELTA/src/app/shared/components/credit-card-form/credit-card-form.component';
import { SelectDropdownComponent } from '../app/DELTA/src/app/shared/components/select-dropdown/select-dropdown.component';
import {
  TableActionsDropdownComponent
} from '../app/DELTA/src/app/shared/components/table-actions-dropdown/table-actions-dropdown.component';

import { CoreModule } from '../app/DELTA/src/app/core/core.module';
import { ComponentsModule as DELTAComponentsModule } from '../app/DELTA/src/app/shared/components/components.module';
import { OverviewModule } from '../app/DELTA/src/app/pages/account/billing/overview/overview.module';
import { PagesModule } from '../app/DELTA/src/app/pages/pages.module';
import { InventoryModule } from '../app/DELTA/src/app/pages/inventory/inventory.module';
import { AccountModule } from '../app/DELTA/src/app/pages/account/account.module';
import { BillingModule } from '../app/DELTA/src/app/pages/account/billing/billing.module';
import { PaymentMethodsModule } from '../app/DELTA/src/app/pages/account/billing/payment-methods/payment-methods.module';
import { HistoryModule } from '../app/DELTA/src/app/pages/account/billing/history/history.module';
import { ContactModule } from '../app/DELTA/src/app/pages/account/billing/contact/contact.module';
import { CreditCardFormModule } from '../app/DELTA/src/app/shared/components/credit-card-form/credit-card-form.module';

import { TranslateService as TranslateServiceDELTA } from '../app/DELTA/src/app/shared/services/translate.service';
import { CommonService as CommonServiceDELTA } from '../app/DELTA/src/app/shared/services/common.service';
import { BillingContactService } from '../app/DELTA/src/app/shared/services/billing-contact.service';
import { CreditCardService } from '../app/DELTA/src/app/shared/services/credit-card.service';
import { BillingService } from '../app/DELTA/src/app/pages/account/billing/billing.service';

storiesOf('DELTA', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        LocaleValidationModule.forRoot(),
        RouterModule.forRoot([{
          path: 'iframe.html',
          component: DELTA,
        },
        {
          path: '**',
          component: DELTA,
        }]),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        DELTAComponentsModule,
        PagesModule,

        PaymentMethodsModule,
        OverviewModule,
        HistoryModule,
        ContactModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ DELTA ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        TranslateServiceDELTA,
        CommonServiceDELTA,
        BillingContactService,
        CreditCardService,
        BillingService,
      ],
    })
  )
  .add('App', () => {
    return {
      component: DELTA,
    };
  })
  .add('Pages', () => {
    return {
      component: PagesComponent,
    };
  })
  .add('Inventory', () => {
    return {
      template: `<app-inventory></app-inventory>`,
      moduleMetadata: {
        imports: [InventoryModule]
      }
    };
  })
  .add('Remind Table Filter', () => {
    return {
      component: RemindTableFilterComponent,
    };
  })
  .add('Remind Table', () => {
    return {
      component: RemindTableComponent,
    };
  })
  .add('Account', () => {
    return {
      component: AccountComponent,
    };
  })
  .add('Billing', () => {
    return {
      template: `<app-billing></app-billing>`,
      moduleMetadata: {
        imports: [BillingModule],
      }
    };
  })
  .add('Payment Methods', () => {
    return {
      template: `<app-payment-methods></app-payment-methods>`,
    };
  })
  .add('App Credit Cards Table', () => {
    const creditCards = [
      {
        name: 'Visa ending in 1520',
        imageUrl: 'assets/img/cards-images/visa-mastercard-amex.png',
        expirationDate: new Date('06/01/2025'),
        activated: true,
        number: '1234 1234 1234 1234',
        cvv: '000',
        zipCode: '0000'
      }
    ];
    const active = action('active');
    const remove = action('remove');
    return {
      props: {
        creditCards,
      },
      component: CreditCardsTableComponent
    };
  })
  .add('App Credit Card', () => {
    return {
      component: AddCreditCardComponent
    };
  })
  .add('Overview', () => {
    return {
      template: `<app-overview></app-overview>`,
    };
  })
  .add('Plan Overview', () => {
    const plan = {
      name: 'account_your_plan',
      role: 'account_role_owner',
      plan: 'enterprise_silver',
      summaries: [
        {
          text: 'account_plan_monthly_subscription',
          cost: 1250
        },
        {
          text: 'account_sdi_20_credit_price',
          listPrice: 99,
          cost: 84.15, discount: 15,
          costLink: '/'
        },
        {
          text: 'account_learner_toolkit_price',
          listPrice: 75,
          cost: 63.75,
          discount: 15,
          partnerLink: '/account/contact-psp'
        }
      ],
      features: [
        'account_admin_role_available',
        'account_unlimited_coach_roles',
        'account_unlimited_guest_sdi_invites',
        'account_unlimited_outside_plan_connections'
      ]
    };
    return {
      props: {
        plan
      },
      component: PlanOverviewComponent
    };
  })
  .add('History', () => {
    return {
      template: `<app-history></app-history>`,
    };
  })
  .add('History Table', () => {
    const data =  {
      rows: [
        {
          date: new Date('02/15/2018'),
          quantity: [1200, 600, 500],
          activity: ['account_credits_purchased', 'account_csr_toolkits_purchased', 'account_csa_toolkits_purchased', 'account_more_text'],
          amount: 100980,
          purchasedBy: 'Susan Anderson'
        },
        {
          date: new Date('02/15/2018'),
          quantity: [500],
          activity: ['account_csr_toolkits_purchased'],
          amount: 30850,
          purchasedBy: 'Susan Anderson'
        },
        {
          date: new Date('02/18/2018'),
          quantity: [25, 50],
          activity: ['account_credits_purchased', 'account_csr_toolkits_purchased'],
          amount: 1593.75,
          purchasedBy: 'Susan Anderson'
        },
        {
          date: new Date('02/22/2018'),
          quantity: [6],
          activity: ['account_credits_purchased'],
          amount: 504.90,
          purchasedBy: 'Victoria Patel'
        }
      ],
      filter: {
        type: 'account_report_period'
      }
    };
    return {
      props: {
        data,
      },
      component: HistoryTableComponent
    };
  })
  .add('History Filter', () => {
    const filter = {
      type: 'account_report_period'
    };
    const filterChange = action('filterChange');
    return {
      props: {
        filter,
        filterChange
      },
      component: HistoryFilterComponent
    };
  })
  .add('Contact', () => {
    return {
      template: `<app-contact></app-contact>`,
    };
  })
  .add('Email Frequency', () => {
    return {
      component: EmailFrequencyComponent
    };
  })
  .add('Contact Table', () => {
    const contacts = [
      { name: 'Susan Anderson', email: 'susan.anderson@organization.com', role: 'train_owner_text' },
      { name: 'Peter Theron', email: 'peter.theron@organization.com', role: 'train_admin_text' },
      { name: 'Accounting', email: 'accounting@organization.com', role: 'account_billing_contact' }
    ];
    const remove = action('remove');
    return {
      props: {
        contacts,
        remove
      },
      component: ContactTableComponent
    };
  })
  .add('Add Contact', () => {
    const create = action('create');
    return {
      props: {
        create
      },
      component: AddContactComponent
    };
  })
  .add('Contact Psp', () => {
    return {
      component: ContactPspComponent
    };
  })
  .add('Edit Card', () => {
    return {
      component: EditCardComponent
    };
  })
  .add('Add Contact Form', () => {
    const save = action('save');
    const cancel = action('cancel');
    return {
      props: {
        save,
        cancel
      },
      component: AddContactFormComponent
    };
  })
  .add('Contact Form', () => {
    const cancel = action('cancel');
    return {
      props: {
        cancel
      },
      component: ContactFormComponent
    };
  })
  .add('Contact Us', () => {
    return {
      component: ContactUsComponent
    };
  })
  .add('Credit Card Form', () => {
    const card =   {
        name: 'Visa ending in 1520',
        imageUrl: 'assets/img/cards-images/visa-mastercard-amex.png',
        expirationDate: new Date('06/01/2025'),
        activated: true,
        number: '1234 1234 1234 1234',
        cvv: '000',
        zipCode: '0000'
      };
    const cardChange = action('cardChange');
    const cancel = action('cancel');
    return {
      props: {
        card,
        cardChange,
        cancel
      },
      component: CreditCardFormComponent
    };
  })
  .add('Select Dropdown', () => {
    const items = [
      { text: 'Label 1', value: 'label1' },
      { text: 'Label 2', value: 'label2' },
    ];
    const item = { text: 'Label 1', value: 'label1' };
    const valueChange = action('valueChange');
    return {
      props: {
        items,
        item,
        valueChange
      },
      component: SelectDropdownComponent
    };
  })
  .add('Table Actions Dropdown', () => {
    const actions = [
      { text: 'account_edit_card' },
      { text: 'account_remove_card' }
    ];
    const tableAction = action('action');
    return {
      props: {
        actions,
        tableAction
      },
      component: TableActionsDropdownComponent,
      moduleMetadata: {
        imports: [CreditCardFormModule]
      }
    };
  })
  ;
