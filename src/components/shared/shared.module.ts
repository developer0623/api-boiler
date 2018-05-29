import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { SimpleNotificationsModule } from 'angular2-notifications';

import {
  LocalizationModule,
  LocaleValidationModule,
  L10nLoader
} from 'angular-l10n';
import { l10nConfig } from './consts/l10nConfig';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    LocalizationModule.forRoot(l10nConfig),
    LocaleValidationModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalizationModule,
    LocaleValidationModule,
    ClipboardModule,
    SimpleNotificationsModule,
    NgbModule
  ]
})
export class SharedModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
