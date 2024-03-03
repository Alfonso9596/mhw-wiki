import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export enum MONSTER_KEYS {
  MONSTER_PAGE = "MONSTER_PAGE",
  MONSTER_PAGE_SIZE = "MONSTER_PAGE_SIZE"
}

export const useMonsterStore = defineStore('monsters', () => {
  const monsterPage: Ref<number> = ref(
    Number(localStorage.getItem(MONSTER_KEYS.MONSTER_PAGE) ?? '1')
  );

  function setMonsterPage(page: number): void {
    localStorage.setItem(MONSTER_KEYS.MONSTER_PAGE, String(page));
    monsterPage.value = page;
  }

  const monsterPageSize: Ref<number> = ref(
    Number(localStorage.getItem(MONSTER_KEYS.MONSTER_PAGE_SIZE) ?? '5')
  );

  function setMonsterPageSize(pageSize: number): void {
    localStorage.setItem(MONSTER_KEYS.MONSTER_PAGE_SIZE, String(pageSize));
    monsterPageSize.value = pageSize;
  }

  return {
    monsterPage,
    setMonsterPage,
    monsterPageSize,
    setMonsterPageSize
  }
})