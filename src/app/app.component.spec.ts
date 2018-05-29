import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

import {
  L10nConfig,
  L10nLoader,
  StorageStrategy,
  ProviderType,
  LocalizationModule
} from 'angular-l10n';

describe('AppComponent', () => {
  let l10nLoader: L10nLoader;
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
      providers: [
        // Karma serves files from 'base' relative path.
        { type: ProviderType.Static, prefix: 'assets/locale-' }
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        LocalizationModule.forRoot(l10nConfig),
        HttpClientTestingModule
      ]
    }).compileComponents();

    l10nLoader = TestBed.get(L10nLoader);
    l10nLoader.load();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  xit(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
