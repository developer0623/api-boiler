import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  Language,
  L10nConfig,
  L10nLoader,
  TranslationModule,
  LocaleService,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let l10nLoader: L10nLoader;

  const translationEN: any = require('../../assets/locale-en.json');
  const l10nConfig: L10nConfig = {
    locale: {
      languages: [
        { code: 'en', dir: 'ltr' }
      ],
      defaultLocale: { languageCode: 'en', countryCode: 'US' },
      currency: 'USD',
      storage: StorageStrategy.Disabled
    },
    translation: {
      translationData: [
        { languageCode: 'en', data: translationEN }
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        HttpClientTestingModule,
        TranslationModule.forRoot(l10nConfig),
        MarkdownModule.forRoot()
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
    l10nLoader = TestBed.get(L10nLoader);
    l10nLoader.load();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
