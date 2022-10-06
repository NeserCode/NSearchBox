<script setup>
import { searchOptions } from "../utils/searchOptions";

// const computedSearchOptionsJson = JSON.stringify(searchOptions);
</script>

<template>
  <div class="setting-main">
    <span>⚙ Testing the setting view.</span>
    <div v-for="option in searchOptions" :key="option.id">
      <span>Name {{ option.title }}</span>
      <hr />
      <span>prefix {{ option.urlPrefix }}</span>
    </div>
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