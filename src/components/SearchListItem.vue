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
  isSettingShow: {
    type: Boolean,
    default: false,
  },
});

const { item, searchText, isSettingShow } = toRefs($props);
const isSearchOptionsVisable = computed(() => {
  return searchText.value === "" || !isSettingShow;
});
searchOptions.sort((a, b) => a.power - b.power);

function openSearchResult(urlPrefix) {
  shell.openExternal(`${urlPrefix}${searchText.value}`);
  console.log(`openExternal: ${urlPrefix}${searchText.value}`);
}

const generateOptions = [...(item.value ?? []), ...searchOptions];
const activedItemId = ref(0);
const computedActiveClass = computed(() => (index) => {
  return index === activedItemId.value ? "active" : null;
});
import { $Bus } from "../utils/mitt";

// import { $Fonts } from "../utils/getFontList";
// $Fonts.then((res) => {
//   console.log(res);
// });

function onSearchPressKey(busData) {
  function up(x, min, max) {
    return x - 1 < min ? max - 1 : x - 1;
  }
  function down(x, min, max) {
    return x + 1 >= max ? min : x + 1;
  }

  if (busData.code === "Enter") {
    const { urlPrefix } = generateOptions[activedItemId.value];
    openSearchResult(urlPrefix);
  } else if (busData.code === "ArrowUp" || busData.code === "ArrowDown") {
    activedItemId.value =
      busData.code === "ArrowUp"
        ? up(activedItemId.value, 0, generateOptions.length)
        : down(activedItemId.value, 0, generateOptions.length);
    console.log(activedItemId.value);
  } else console.log(busData.code);
}

$Bus.on("on-press-key", onSearchPressKey);
</script>

<template>
  <div
    :class="['items-container', isSearchOptionsVisable ? '' : 'active']"
    v-show="!isSearchOptionsVisable"
  >
    <!-- <div class="search-list-item" v-for="i in item" :key="i.id">
      <span class="title">{{ i.title }}</span>
    </div> -->
    <div
      :class="['search-list-item', computedActiveClass(index)]"
      v-for="(s, index) in searchOptions"
      :key="s.id"
      @click="openSearchResult(s.urlPrefix)"
    >
      <span class="title">{{ s.title }}</span>
      <span class="search-text">{{ searchText }}</span>
    </div>
  </div>
</template>


<style lang="postcss" scoped>
.items-container {
  @apply flex flex-col mt-0.5 rounded box-border overflow-x-hidden overflow-y-auto
  border-t border-slate-300 dark:border-slate-500 max-h-96;
}

/* search-list-item */
.search-list-item {
  @apply flex flex-col w-full py-2 px-4 rounded
  border border-t-0 border-slate-300 dark:border-slate-500
  bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300
  transition-all cursor-pointer;
}
.search-list-item .title {
  @apply text-xl font-semibold;
}
.search-list-item .search-text {
  @apply text-sm text-slate-700 dark:text-slate-300 text-opacity-70 dark:text-opacity-70
  whitespace-nowrap overflow-ellipsis overflow-hidden;
}
</style>