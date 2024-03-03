import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export enum LOCALES_KEYS {
  DATA_LANGUAGE = 'DATA_LANGUAGE'
}

export const useLocalesStore = defineStore('locales', () => {
  const dataLanguage: Ref<string> = ref(
    localStorage.getItem(LOCALES_KEYS.DATA_LANGUAGE) || 'en'
  );
  
  function setDataLanguage(lang: string): void {
    localStorage.setItem(LOCALES_KEYS.DATA_LANGUAGE, lang);
    dataLanguage.value = lang;
  }

  return {
    dataLanguage,
    setDataLanguage
  }
})