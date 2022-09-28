<script setup>
import SearchListItem from "../components/SearchListItem.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
const remote = require("@electron/remote");

import {
  getCurrentWindowSize,
  initResizeObserver,
} from "../utils/getCurrentWindowSize";
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

  // 记录窗口位置并存储 atom_tools_position_x/y
  localStorageWindowPosition(getCurrentWindowPosition());
  console.log("ipc:app-get-focus");
});
ipcRenderer.on("app-get-blur", () => {
  // remote.getCurrentWindow().hide();
  input.value.blur();

  // 记录窗口位置并存储 atom_tools_position_x/y
  localStorageWindowPosition(getCurrentWindowPosition());
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

// create hook set size
const resizeOb = initResizeObserver(() => {
  ipcRenderer.send("app-resize", {
    width: getCurrentWindowSize().width,
    height: getCurrentHtmlSize(document.body).height,
  });
});

onMounted(() => {
  resizeOb.observe(document.body);
});
onUnmounted(() => {
  resizeOb.disconnect();
});

// input value
const inputValue = ref("");

function onInput() {}

import { $Bus } from "../utils/mitt";
import { messageQueue } from "../utils/messageQueue";

const keyQueue = new messageQueue([]);
function onKeydown(event) {
  $Bus.emit("on-press-key", {
    text: event.code === "Enter" ? "Enter this" : "",
    code: event.code,
  });
  keyQueue.joinQueue({
    trigger: true,
    key: event.code,
    timeStamp: event.timeStamp,
  });
}

function onKeyup(event) {
  $Bus.emit("up-press-key", {
    code: event.code,
    event,
  });
  keyQueue.joinQueue({
    trigger: false,
    key: event.code,
    timeStamp: event.timeStamp,
  });
  console.log(keyQueue.getMapedTime("Backspace"));
}
</script>

<template>
  <div class="search-main">
    <input
      class="search-input-body"
      v-model="inputValue"
      type="text"
      ref="input"
      placeholder="Hi uTools"
      @input="onInput"
      @keydown="onKeydown"
      @keyup="onKeyup"
    />
    <div class="dragArea" />
    <search-list-item :searchText="inputValue" />
  </div>
</template>

<style lang="postcss" scoped>
.search-main {
  @apply relative w-full h-full;
}

.dragArea {
  -webkit-app-region: drag;
  @apply absolute w-6 h-12 top-2 right-2 rounded
  bg-neutral-300 dark:bg-neutral-500
  transition-all cursor-move;
}

.search-input-body {
  @apply w-full h-16 px-4 pr-10 outline-none
  bg-gray-100 dark:bg-gray-900 text-2xl text-gray-500 dark:text-gray-300
  border-gray-400 dark:border-gray-500 border box-border rounded caret-slate-400
  duration-300 transition-all;
}
</style>