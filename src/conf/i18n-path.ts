const i18nFolder = '/assets/i18n/';

export const LanguageOptions: Array<Language> = [
  {
    displayI18n: 'English',
    key: 'en-us'
  },
  {
    displayI18n: '繁體中文',
    key: 'zh-tw'
  },
];

export interface Language {
  displayI18n: string;
  key: string;
}

export const I18nPath = [
  // NO COMMENT IN JSON ALLOWED!!
  { prefix: i18nFolder, suffix: '/BUTTON.json' },
  { prefix: i18nFolder, suffix: '/CHALLENGE.json' },
  { prefix: i18nFolder, suffix: '/DIALOG.json' },
  { prefix: i18nFolder, suffix: '/POE.json' },
  { prefix: i18nFolder, suffix: '/HINT.json' },
];
