import { createI18n } from 'vue-i18n';
import localeDirectory from '@/assets/locale/localeDirectory.json';
import { LOCALES_KEYS } from '@/store/locales.store';

export const i18n = createI18n({
  legacy: false,
  composition: false,
  locale: localStorage.getItem(LOCALES_KEYS.DATA_LANGUAGE) || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  pluralRules: {
    pl: (choice: number): number => {
      if (choice === 0 || choice === 1) return choice;
      const teen = choice > 10 && choice < 20;
      const specialCase = choice % 10 >= 2 && choice % 10 <= 4;
      if (!teen && specialCase) return 2;
      return 3;
    }
  },
  messages: localeDirectory
});