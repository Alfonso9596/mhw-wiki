<template>
  <v-app>
    <div class="monsterpage-header pl-xxl-5">
      <v-tabs
        v-model="selectedSize">
        <v-tab v-for="size in sizes" :key="size.value" :value="size.value">
          {{ t(size.label) }}
        </v-tab>
      </v-tabs>
    </div>
    <div class="monsterpage-searchbar pl-xxl-5 pr-xxl-5">
      <v-text-field
        v-model="search"
        :label="t('commons.search')"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        clearable
        clear-icon="mdi-close"
      ></v-text-field>
    </div>
    <div class="monsterpage-content overflow-y-auto pl-xxl-5 pr-xxl-5">
      <div class="monsterpage-content__container d-flex align-content-start flex-wrap">
        <v-card
          v-for="monster in filteredMonsters()"
          class="ma-2 pa-2 monsterpage-content__container-card"
          max-width="200"
          :key="monster.id"
        >
          <v-img
            height="200px"
            width="200px"
            :src="monster.icon"
            cover
          />

          <v-card-title>{{ monster.name }}</v-card-title>

          <v-card-subtitle class="pb-xxl-4" v-if="selectedSize === 'large'">{{ monster.ecology }}</v-card-subtitle>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalesStore } from '@/store/locales.store';
import { useMonsterStore } from '@/store/monsters.store';
import { getAllMonsters } from '@/api/networks/monsters.network';

const { t } = useI18n();
const localesStore = useLocalesStore();
const monstersStore = useMonsterStore();

const state = reactive<{
  monsterList: any[];
  page: number;
  pageSize: number;
  totalRecords: number | undefined;
  loading: boolean;
  dataLanguage: any;
}>({
  monsterList: [],
  page: monstersStore.monsterPage,
  pageSize: monstersStore.monsterPageSize,
  totalRecords: undefined,
  loading: false,
  dataLanguage: computed(() => localesStore.dataLanguage)
});

const search = ref<string>('');
const selectedSize = ref<string>('small');

const sizes = [
  {
    label: 'monsters.small',
    value: 'small'
  },
  {
    label: 'monsters.large',
    value: 'large'
  }
];

const headers = [
  {
    align: 'start',
    key: 'data.name',
    sortable: true,
    title: 'monsters.table.name'
  },
  {
    key: 'size',
    title: 'monsters.table.size'
  },
  {
    key: 'weaknessFire',
    title: 'monsters.table.fire'
  },
  {
    key: 'weaknessWater',
    title: 'monsters.table.water'
  },
  {
    key: 'weaknessIce',
    title: 'monsters.table.ice'
  },
  {
    key: 'weaknessThunder',
    title: 'monsters.table.thunder'
  },
  {
    key: 'weaknessDragon',
    title: 'monsters.table.dragon'
  }
];

const pageParams = {
  page: state.page,
  pageSize: 20
};

const fetchMonstersBySize = async() => {
  state.loading = true;
  const params = {
    size: selectedSize.value
  };
  const response = await getAllMonsters(state.dataLanguage, params) || {};
  state.monsterList = response;
  state.loading = false;
};

const filteredMonsters = () => {
  if (!search.value || search.value === '' || search.value === null || search.value === undefined) {
    return state.monsterList;
  } else {
    return state.monsterList.filter((monster) => {
      return monster.name.toLowerCase().indexOf(search.value.toLowerCase()) >= 0;
    });
  }
};

watch(
  () => state.dataLanguage,
  () => {
    fetchMonstersBySize();
  }
);

watch(
  () => selectedSize.value,
  () => {
    fetchMonstersBySize();
    search.value = '';
  }
);
fetchMonstersBySize();
</script>

<style lang="scss" scoped>
.monsterpage-header {
  height: 60px;
}
.monsterpage-searchbar {

}
.monsterpage-content {
  scrollbar-width: none;
  height: calc(100vh - 64px - 40px - 60px);

  &__container {
    margin-top: 30px;

    &-card {
      transition: 0.2s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>