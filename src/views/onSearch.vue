<script setup>
import SearchListItem from "../components/SearchListItem.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
const remote = require("@electron/remote");

import { getCurrentWindowSize } from "../utils/getCurrentWindowSize";
import { getCurrentHtmlSize } from "../utils/getCurrentHtmlSize";

const input = ref(null);

// ipc message listener
ipcRenderer.on("app-get-focus", () => {
  remote.getCurrentWindow().show();
  input.value.focus();
  remote
    .getCurrentWindow()
    .setSize(
      getCurrentWindowSize().width,
      getCurrentHtmlSize(document.body).height
    );
  console.log(getCurrentHtmlSize(document.body));

  console.log("ipc:app-get-focus");
});
ipcRenderer.on("app-get-blur", () => {
  // remote.getCurrentWindow().hide();
  input.value.blur();
  console.log("ipc:app-get-blur");
});

const listItem = ref([
  { title: 1, id: 1 },
  { title: 2, id: 2 },
]);

onMounted(() => {
  input.value.focus();
  console.log(listItem);
});
onUnmounted(() => {
  input.value.blur();
});
</script>

<template>
  <div class="search-main">
    <input class="search-input-body" type="text" ref="input" />
    <search-list-item :item="listItem" />
  </div>
</template>

<style lang="postcss" scoped>
.search-main {
  -webkit-app-region: drag;
  @apply w-full h-full;
}

.search-input-body {
  @apply w-full h-full px-4 outline-none
  bg-gray-100 dark:bg-gray-900 text-3xl text-gray-500 dark:text-gray-300
  box-border caret-slate-400
  transition-all;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>