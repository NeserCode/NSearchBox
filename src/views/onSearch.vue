<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
const remote = require("@electron/remote");

const input = ref(null);

// ipc message listener
ipcRenderer.on("app-get-focus", () => {
  remote.getCurrentWindow().show();
  input.value.focus();
  console.log("ipc:app-get-focus");
});
ipcRenderer.on("app-get-blur", () => {
  remote.getCurrentWindow().hide();
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
}
.search-main {
  @apply w-full h-16;
}

.search-input-body {
  @apply w-full h-full px-4
  bg-gray-100 dark:bg-gray-900 text-3xl text-gray-500 dark:text-gray-300
  outline-none box-border caret-slate-400;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>