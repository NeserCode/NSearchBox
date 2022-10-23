<script setup>
import SearchListItem from "../components/SearchListItem.vue"
import Setting from "./onSetting.vue"
import {
	getCurrentWindowSize,
	initResizeObserver,
} from "../utils/getCurrentWindowSize"
import { getCurrentHtmlSize } from "../utils/getCurrentHtmlSize"
import {
	getCurrentWindowPosition,
	localStorageWindowPosition,
	getLocalStorageWindowPosition,
} from "../utils/getCurrentWindowPosition"
import { ref, toRefs, onMounted, onUnmounted } from "vue"
import { ipcRenderer } from "electron"

import { $Bus } from "../utils/mitt"
import { messageQueue } from "../utils/messageQueue"
import { computed } from "vue"

const pHer = ref("Hi Atom Tools")
$Bus.on("atom_tools_hitokoto", (hitokoto_obj) => {
	const { hitokoto } = toRefs(hitokoto_obj)
	pHer.value = hitokoto.value
})

const remote = require("@electron/remote")

const input = ref(null)

// ipc message listener
ipcRenderer.on("app-get-focus", () => {
	remote.getCurrentWindow().show()
	input.value.focus()

	// 记录窗口位置并存储 atom_tools_position_x/y
	localStorageWindowPosition(getCurrentWindowPosition())
	console.log("ipc:app-get-focus")
})
ipcRenderer.on("app-get-blur", () => {
	// remote.getCurrentWindow().hide();
	input.value.blur()

	// 记录窗口位置并存储 atom_tools_position_x/y
	localStorageWindowPosition(getCurrentWindowPosition())
	console.log("ipc:app-get-blur")
})

onMounted(() => {
	input.value.focus()
})
onUnmounted(() => {
	input.value.blur()
})

// create hook set position
remote
	.getCurrentWindow()
	.setPosition(
		getLocalStorageWindowPosition().x,
		getLocalStorageWindowPosition().y
	)

// create hook set size
const resizeOb = initResizeObserver(() => {
	ipcRenderer.send("app-resize", {
		width: getCurrentWindowSize().width,
		height: getCurrentHtmlSize(document.body).height,
	})
})

onMounted(() => {
	resizeOb.observe(document.body)
})
onUnmounted(() => {
	resizeOb.disconnect()
})

// input value
const inputValue = ref("")

function onInput() {
	// 输入内容时关闭设置
	if (inputValue.value.length === 0) {
		isHoldSetting.value = false
	}
}

const keyQueue = new messageQueue([])
const isHoldSetting = ref(false)
function onKeydown(event) {
	$Bus.emit("on-press-key", {
		code: event.code,
		event,
	})
	keyQueue.joinQueue({
		trigger: true,
		key: event.code,
	})
}

function onKeyup(event) {
	$Bus.emit("up-press-key", {
		code: event.code,
		event,
	})
	keyQueue.quitQueue({
		trigger: false,
		key: event.code,
	})
}

$Bus.on("app-hold-setting", () => {
	if (isHoldSetting.value) isHoldSetting.value = false
	else isHoldSetting.value = inputValue.value === ""
})

const isSettingShow = computed(() => {
	return inputValue.value === "" && isHoldSetting.value
})
</script>

<template>
	<div class="search-main">
		<input
			class="search-input-body"
			v-model="inputValue"
			type="text"
			ref="input"
			:placeholder="pHer"
			@input="onInput"
			@keydown="onKeydown"
			@keyup="onKeyup"
		/>
		<div class="dragArea" />
		<search-list-item :searchText="inputValue" :isSettingShow="isSettingShow" />
		<setting v-show="isSettingShow" />
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
