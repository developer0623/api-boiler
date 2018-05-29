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
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent as CHARLIE } from '../app/CHARLIE/src/app/app.component';
import { BillingAddressComponent } from '../app/CHARLIE/src/app/billing-address/billing-address.component';
import { InformationalTextComponent } from '../app/CHARLIE/src/app/informational-text/informational-text.component';
import { InventoryComponent } from '../app/CHARLIE/src/app/inventory/inventory.component';
import { NavigationHeaderComponent } from '../app/CHARLIE/src/app/navigation-header/navigation-header.component';
import { OrderTableComponent } from '../app/CHARLIE/src/app/order-table/order-table.component';
import { InventoryOverviewComponent } from '../app/CHARLIE/src/app/overview/overview.component';
import { PurchaseStepsComponent } from '../app/CHARLIE/src/app/purchase-steps/purchase-steps.component';
import { QuantityInputComponent } from '../app/CHARLIE/src/app/quantity-input/quantity-input.component';
import { TransactionBarComponent } from '../app/CHARLIE/src/app/transaction-bar/transaction-bar.component';
import { personData } from '../app/CHARLIE/src/app/inventory/peronData';

storiesOf('CHARLIE', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        LocaleValidationModule.forRoot(),
        RouterModule.forRoot([{
          path: 'iframe.html',
          component: InventoryComponent,
        },
        {
          path: '**',
          component: InventoryComponent,
        }]),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InventoryComponent ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '' },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }
      ],
    })
  )
  .add('App', () => {
    return {
      component: CHARLIE,
      moduleMetadata: {
        declarations: [
          InventoryOverviewComponent,
          TransactionBarComponent,
          PurchaseStepsComponent,
          NavigationHeaderComponent,
          InformationalTextComponent,
          QuantityInputComponent,
          OrderTableComponent,
          BillingAddressComponent,
          InventoryComponent,
        ],
      }
    };
  })
  .add('Billing Address', () => {
    return {
      component: BillingAddressComponent
    };
  })
  .add('Informational Text', () => {
    return {
      component: InformationalTextComponent,
      props: {
        type: 'guest-limit',
        paramsData: {
          plan: 'pro',
          name: 'Mark Logan',
          title: 'Director',
          navigationMotives: 'RED',
          navigationConflict: ['R', 'B', 'G'],
          sdiDate: 'SDI 2.0 - 18 April 2017',
          members: { current: 47, max: 100 },
          guests: { current: 6, max: 20 },
          invitations: { open: 5, completed: 16 },
          credits: { current: 6, max: 12 },
        }
      },
    };
  })
  .add('Inventory Component', () => {
    return {
      component: InventoryComponent,
      moduleMetadata: {
        declarations: [
          InventoryOverviewComponent,
          TransactionBarComponent,
          PurchaseStepsComponent,
          NavigationHeaderComponent,
          InformationalTextComponent,
          QuantityInputComponent,
          OrderTableComponent,
          BillingAddressComponent,
        ],
      }
    };
  })
  .add('Navigation Header', () => {
    return {
      component: NavigationHeaderComponent
    };
  })
  .add('Order Table', () => {
    return {
      component: OrderTableComponent,
      props: {
        orderData: {}
      }
    };
  })
  .add('Inventory Overview', () => {
    return {
      component: InventoryOverviewComponent,
      props: {
        personData: personData.pro
      }
    };
  })
  .add('Purchase Steps', () => {
    return {
      component: PurchaseStepsComponent,
      props: {
        personData: {
          plan: 'pro',
          name: 'Mark Logan',
          title: 'Director',
          navigationMotives: 'RED',
          navigationConflict: ['R', 'B', 'G'],
          sdiDate: 'SDI 2.0 - 18 April 2017',
          members: { current: 47, max: 100 },
          guests: { current: 6, max: 20 },
          invitations: { open: 5, completed: 16 },
          credits: { current: 6, max: 12 },
        }
      },
      moduleMetadata: {
        declarations: [
          InformationalTextComponent,
          QuantityInputComponent,
          OrderTableComponent,
          BillingAddressComponent,
        ],
      }
    };
  })
  .add('Quantity Input', () => {
    const quantityChange = action('quantityChanged');
    return {
      component: QuantityInputComponent,
      props: {
        initialQuantity: number('initialQuantity', 0),
        maximumQuantity: number('maximumQuantity', 100),
        quantityChange
      }
    };
  })
  .add('Transaction Bar', () => {
    return {
      component: TransactionBarComponent
    };
  }
);
