<script setup>
import { computed, defineProps, toRefs } from "vue";
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
  console.log("/");
  shell.openExternal(`${urlPrefix}${s}`);
  console.log(`openExternal: ${urlPrefix}${s}`);
}
</script>

<template>
  <div
    :class="['items-container', isSearchOptionsVisable ? '' : 'active']"
    v-if="!isSearchOptionsVisable"
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
  @apply flex flex-col mt-px rounded box-border overflow-x-hidden overflow-y-auto;
}

/* search-list-item */
.search-list-item {
  @apply flex flex-col w-full py-2 px-4 mt-px rounded
  border border-slate-400
  bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300
  transition-all;
}
.search-list-item .title {
  @apply text-xl font-semibold;
}
.search-list-item .search-text {
  @apply text-sm;
}
</style>