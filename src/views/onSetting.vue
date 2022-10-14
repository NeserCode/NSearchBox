<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import SettingItem from "../components/SettingItem.vue";
import SearchOption from "../components/SearchOption.vue";
import { searchOptions } from "../utils/searchOptions";

import { computed } from "vue";
const isSearchOptionsShow = computed(() => (option) => {
  return option.type === "searchOption";
});

// const computedSearchOptionsJson = JSON.stringify(searchOptions);
</script>

<template>
  <div class="setting-main">
    <span>⚙ Testing the setting view.</span>
    <TabGroup>
    <TabList>
      <Tab>Search Options</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <setting-item
      v-for="option in searchOptions"
      :key="option.id"
      :settingOption="option"
    >
      <search-option v-if="isSearchOptionsShow(option)" />
    </setting-item>
      </TabPanel>
      <TabPanel>Content 2</TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
  </div>
</template>

<style lang="postcss" scoped>
.setting-main {
  @apply w-full p-2 mt-0.5 rounded
  bg-slate-50 border border-gray-300 dark:bg-slate-900
  text-gray-700 dark:text-gray-300
  transition-all duration-300;
}
</style>