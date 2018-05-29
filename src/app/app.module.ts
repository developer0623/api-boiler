import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-md';

import { ComponentsModule } from '../components/components.module';

// Pages/Components
import { AppComponent } from './app.component';

// Third Party Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocaleValidationModule,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';
// import { HeaderComponent } from './header/header.component';
const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'en', countryCode: 'US' },
    currency: 'USD',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: 'assets/locale-' }
    ],
    caching: true,
    // missingValue: 'No key',
    composedKeySeparator: '.',
    i18nPlural: true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LocalizationModule.forRoot(l10nConfig),
    LocaleValidationModule.forRoot(),
    MarkdownModule.forRoot(),
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
