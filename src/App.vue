<template>
  <v-app :class="mainConfig" class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-title>
        <v-avatar>
          <v-img :src="`/mhw-logo-${theme.global.current.value.dark ? 'dark' : 'light'}.png`"></v-img>
        </v-avatar>
        Monster Hunter World Wiki
      </v-app-bar-title>
      <v-tabs
        v-model="state.dataLanguage"
        @update:model-value="onSelectedDataLanguage">
        <v-tab v-for="language in state.dataLanguageOptions" :key="language.value" :value="language.value">{{ language.label }}</v-tab>
      </v-tabs>
      <v-btn
        class="ma-2"
        icon="mdi-theme-light-dark"
        @click="toggleTheme"
      >
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          router
          :to="route.path"
        >
          <template #prepend>
            <v-icon :icon="route.icon" />
          </template>
          <template #title>
            <span class="navbar_label">{{ route.label ? t(route.label) : route.name }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center">
      <v-card>
        <router-view/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { computed, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/router';
import { useI18n } from 'vue-i18n';
import { useLocalesStore } from '@/store/locales.store';
import { getDataLanguages } from './api/networks/locales.network';

const theme = useTheme();
const { locale } = useI18n({ useScope: 'global' });
const localesStore = useLocalesStore();
const { t } = useI18n();

const state = reactive<{
  dataLanguage: any;
  dataLanguageOptions: any[];
}>({
  dataLanguage: localesStore.dataLanguage,
  dataLanguageOptions: []
});

interface IDataLang {
  id: string;
  name: string;
}

const fetchDataLanguageOptions = async() => {
  state.dataLanguageOptions = (
    (await getDataLanguages()) || []
  )?.map((dataLang: IDataLang) => ({
    label: dataLang.name,
    value: dataLang.id
  }));
};

const onSelectedDataLanguage = () => {
  localesStore.setDataLanguage(state.dataLanguage);
  locale.value = state.dataLanguage;
};

const mainConfig = computed(() => {
  return {
    'dark-background': theme.global.current.value.dark,
    'light-background': !theme.global.current.value.dark
  };
});

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

fetchDataLanguageOptions();
</script>

<style scoped lang="scss">
.v-card {
  //100vh = full view; 64px = app bar (header); 40px = margins top & bottom
  height: calc(100vh - 64px - 40px);
  top: 0;
  width: calc(100% - 40px);
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 10px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.card-header {
  height: 60px;
  vertical-align: middle;
  display: flex;
  padding-left: 10px;
  &__icon {
    padding-right: 10px;
  }
  &__label {
    font-size: large;
  }
}
.v-navigation-drawer {
  box-shadow: 0px 0px 4px 0px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2));
}
.dark-background {
  background-color: rgba(109, 109, 109, 0.234);
}
.light-background {
  background-color: rgba(255, 255, 255, 0.676);;
}
.v-app-bar.v-toolbar {
  &.v-theme--light {
    background-color: rgba(229, 229, 229, 0.85);
  }
  &.v-theme--dark {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.v-navigation-drawer {
  &.v-theme--light {
    background-color: rgba(229, 229, 229, 0.85);
  }
  &.v-theme--dark {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>