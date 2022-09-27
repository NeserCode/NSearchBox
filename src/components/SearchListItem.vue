<script setup>
import { computed, defineProps, toRefs, ref } from "vue";
import { shell } from "electron";
import { searchOptions } from "../utils/searchOptions";

const $props = defineProps({
  item: {
    type: Array,
  },
  searchText: {
    type: String,
    default: "",
  },
});

const { item, searchText } = toRefs($props);
const isSearchOptionsVisable = computed(() => {
  return searchText.value === "";
});
searchOptions.sort((a, b) => a.power - b.power);

function openSearchResult(urlPrefix, s) {
  shell.openExternal(`${urlPrefix}${s}`);
  console.log(`openExternal: ${urlPrefix}${s}`);
}

const generateOptions = [...(item.value ?? []), ...searchOptions];
const activedItemId = ref(0);
import { $Bus } from "../utils/mitt";

function onSearchPressKey(busData) {
  if (busData.code === "Enter") {
    const { urlPrefix } = generateOptions[activedItemId.value];
    openSearchResult(urlPrefix, searchText.value);
  }
}

$Bus.on("on-press-key", onSearchPressKey);
</script>

<template>
  <div
    :class="['items-container', isSearchOptionsVisable ? '' : 'active']"
    v-show="!isSearchOptionsVisable"
  >
    <div class="search-list-item" v-for="i in item" :key="i.id">
      <span class="title">{{ i.title }}</span>
    </div>
    <div
      class="search-list-item"
      v-for="s in searchOptions"
      :key="s.id"
      @click="openSearchResult(s.urlPrefix, searchText)"
    >
      <span class="title">{{ s.title }}</span>
      <span class="search-text">{{ searchText }}</span>
    </div>
  </div>
</template>


<style lang="postcss" scoped>
.items-container {
  @apply flex flex-col mt-px box-border overflow-x-hidden overflow-y-auto
  border-t border-slate-300 dark:border-slate-500;
}

/* search-list-item */
.search-list-item {
  @apply flex flex-col w-full py-2 px-4
  border border-t-0 border-slate-300 dark:border-slate-500
  bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300
  transition-all cursor-pointer;
}
.search-list-item .title {
  @apply text-xl font-semibold;
}
.search-list-item .search-text {
  @apply text-sm;
}
</style>