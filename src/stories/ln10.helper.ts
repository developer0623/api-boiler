import {
  L10nLoader,
  L10nConfig,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';

export function initL10n(l10nLoader: L10nLoader): any {
  return () => l10nLoader.load();
}

export const l10nConfig = {
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
