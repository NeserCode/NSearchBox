<script setup>
import onSearch from "./views/onSearch.vue";
import { onBeforeMount } from "vue";
import { ipcRenderer } from "electron";

// ipc message listener
ipcRenderer.on("app-toggle-dark-mode", () => {
  toggleAppDarkMode();
  console.log("ipc:app-toggle-dark-mode");
});

function toggleAppDarkMode(option) {
  let html = document.querySelector("html");
  if (option === "light") html.classList.remove("dark");
  else if (option === "dark") html.classList.add("dark");
  else if (html.classList.contains("dark")) html.classList.remove("dark");
  else html.classList.add("dark");

  localStorage.setItem(
    "atom_tools_colorModeScheme",
    html.classList.contains("dark") ? "dark" : "light"
  );
}

onBeforeMount(() => {
  toggleAppDarkMode(localStorage.getItem("atom_tools_colorModeScheme"));
});
</script>


<template>
  <div class="appContainer">
    <on-search />
  </div>
</template>

<style lang="postcss" scoped>
.appContainer {
  @apply w-full h-full pr-6 rounded-t bg-transparent overflow-hidden;
}
</style>

<style lang="postcss">
html,
body {
  @apply m-0 p-0 box-border overflow-hidden;
}
</style>

