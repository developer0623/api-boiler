import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  LocalizationModule,
  LocaleValidationModule,
  L10nLoader
} from 'angular-l10n';
import { l10nConfig } from './consts/l10nConfig';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LocalizationModule.forRoot(l10nConfig),
    LocaleValidationModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    SimpleNotificationsModule.forRoot(),
    ClipboardModule
  ],
  exports: [
    LocalizationModule,
    LocaleValidationModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    SimpleNotificationsModule,
    ClipboardModule
  ],
  declarations: [],
  providers: []
})
export class TestModule {}
