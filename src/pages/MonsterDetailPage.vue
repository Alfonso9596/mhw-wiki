<template>
  <v-app>
    <div class="monsterdetailpage__header align-center" :style="cardHeaderStyling">
      <v-card-title>
        <v-icon class="monsterdetailpage__header-icon">
          <v-img :src="state.monster.icon"></v-img>
        </v-icon>
        <span class="monsterdetailpage__header-label">{{ state.monster.name }}</span>
      </v-card-title>
    </div>
    <div class="monsterdetailpage__content overflow-y-auto pl-xxl-5 pr-xxl-5">
      <div class="monsterdetailpage__content-container d-flex justify-space-around mt-5">
        <v-card
          class="monsterdetailpage__content-infocard ma-2 pa-2 w-50 mt-xxl-5"
        >
          <template #title>
            <v-img class="monsterdetailpage__content-image" :src="state.monster.image" width="600" height="600"/>
          </template>
          <template #subtitle>
            {{ state.monster.ecology }}
          </template>
          <template #text>
            <div class="monsterdetailpage__content-description">
              {{ state.monster.description }}
            </div>
          </template>
        </v-card>
        <v-card
          class="monsterdetailpage__content-elements ma-2 pa-2 w-50 mt-xxl-5"
        >
          <template #title>
            <v-img class="monsterdetailpage__content-image" :src="state.monster.image" width="600" height="600"/>
          </template>
          <template #subtitle>
            {{ state.monster.ecology }}
          </template>
          <template #text>
            {{ state.monster.description }}
          </template>
        </v-card>
        <v-card
          class="monsterdetailpage__content-test ma-2 pa-2 w-50 mt-xxl-5"
        >
          <template #title>
            <v-img class="monsterdetailpage__content-image" :src="state.monster.image" width="600" height="600"/>
          </template>
          <template #subtitle>
            {{ state.monster.ecology }}
          </template>
          <template #text>
            {{ state.monster.description }}
          </template>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { reactive, computed, watch } from 'vue';
import { useLocalesStore } from '@/store/locales.store';
import { getMonsterById } from '@/api/networks/monsters.network';

const { t } = useI18n();
const theme = useTheme();
const currentRoute = useRoute();
const localesStore = useLocalesStore();

const state = reactive<{
  monster: any;
  loading: boolean;
  dataLanguage: any;
}>({
  monster: {},
  loading: false,
  dataLanguage: computed(() => localesStore.dataLanguage)
})

const fetchMonsterById = async() => {
  console.log(currentRoute)
  state.loading = true;
  const response = await getMonsterById(state.dataLanguage, currentRoute.params.id.toString()) || {};
  state.monster = response;
  state.loading = false;
}

const cardHeaderStyling = computed(() => {
  return theme.global.current.value.dark
    ? 'background-color: rgba(0, 0, 0, 0.3);'
    : 'background-color: rgba(229, 229, 229, 0.85);'
});

watch(
  () => state.dataLanguage,
  () => {
    fetchMonsterById();
  }
);

fetchMonsterById();
</script>

<style scoped lang="scss">
.monsterdetailpage__header {
  height: 60px;
  vertical-align: middle;
  display: flex;
  padding-left: 10px;
  &-icon {
    padding-right: 5px;
  }
  &-label {
    font-size: large;
  }
}

.monsterdetailpage__content {
  scrollbar-width: none;
  //100vh = full view; 64px = app bar (header); 40px = margins top & bottom; 60px = monsterdetailpage__header
  height: calc(100vh - 64px - 40px - 60px);

  &-description {
    border: 1px solid rgba(129, 129, 129, 0.888);
    padding: 5px;
    border-radius: 8px;
  }
}

</style>