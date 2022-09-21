<script setup>
import SearchListItem from "../components/SearchListItem.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
const remote = require("@electron/remote");

import { getCurrentWindowSize } from "../utils/getCurrentWindowSize";
import { getCurrentHtmlSize } from "../utils/getCurrentHtmlSize";
import {
  getCurrentWindowPosition,
  localStorageWindowPosition,
  getLocalStorageWindowPosition,
} from "../utils/getCurrentWindowPosition";

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

  // 记录窗口位置并存储 atom_tools_position_x/y
  localStorageWindowPosition(getCurrentWindowPosition());
  console.log("ipc:app-get-focus");
});
ipcRenderer.on("app-get-blur", () => {
  // remote.getCurrentWindow().hide();
  input.value.blur();
  console.log("ipc:app-get-blur");
});

onMounted(() => {
  input.value.focus();
});
onUnmounted(() => {
  input.value.blur();
});

// create hook set position
remote
  .getCurrentWindow()
  .setPosition(
    getLocalStorageWindowPosition().x,
    getLocalStorageWindowPosition().y
  );
</script>

<template>
  <div class="search-main">
    <input class="search-input-body" type="text" ref="input" />
    <search-list-item />
  </div>
</template>

<style lang="postcss" scoped>
.search-main {
  -webkit-app-region: drag;
  @apply w-full h-full;
}

.search-input-body {
  @apply w-full h-16 px-4 outline-none
  bg-gray-100 dark:bg-gray-900 text-3xl text-gray-500 dark:text-gray-300
  border-gray-400 dark:border-gray-500 border box-border rounded caret-slate-400
  transition-all;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>