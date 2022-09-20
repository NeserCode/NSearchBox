<script setup>
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
</script>

<template>
  <div class="search-main">
    <input class="search-input-body" type="text" ref="input" />
  </div>
</template>

<style lang="postcss" scoped>
.search-main {
  -webkit-app-region: drag;
  @apply w-full h-16;
}

.search-input-body {
  @apply w-full h-full px-4 outline-none
  bg-gray-100 dark:bg-gray-900 text-3xl text-gray-500 dark:text-gray-300
  box-border caret-slate-400
  transition-all;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>