<script setup>
import onSearch from "./views/onSearch.vue"
import { onBeforeMount } from "vue"
import Axios from "axios"
import { ipcRenderer } from "electron"
import { $Bus } from "./utils/mitt"
import { getConfig } from "./utils/getConfig"

const LOCAL_CONFIG = getConfig()

// ipc message listener
ipcRenderer.on("app-toggle-dark-mode", () => {
	toggleAppDarkMode()
	console.log("ipc:app-toggle-dark-mode")
})

function toggleAppDarkMode(option) {
	let html = document.querySelector("html")
	if (option === "light") html.classList.remove("dark")
	else if (option === "dark") html.classList.add("dark")
	else if (html.classList.contains("dark")) html.classList.remove("dark")
	else html.classList.add("dark")

	localStorage.setItem(
		"atom_tools_colorModeScheme",
		html.classList.contains("dark") ? "dark" : "light"
	)
}

onBeforeMount(() => {
	toggleAppDarkMode(localStorage.getItem("atom_tools_colorModeScheme"))
})

// Inital hitokoto
LOCAL_CONFIG.enableHitokoto &&
	(function () {
		const $axios = new Axios.create({
			baseURL: "https://v1.hitokoto.cn",
			timeout: 10000,
		})

		$axios.get("/?c=i").then((res) => {
			$Bus.emit("atom_tools_hitokoto", {
				...res.data,
			})
		})
	})()
// Inital always on top
ipcRenderer.send("app-on-top", LOCAL_CONFIG.enableAlwaysOnTop)
</script>

<template>
	<div class="appContainer">
		<on-search />
	</div>
</template>

<style lang="postcss" scoped>
.appContainer {
	@apply w-full h-full rounded-t bg-transparent overflow-hidden;
}
</style>

<style lang="postcss">
html,
body {
	@apply m-0 p-0 box-border overflow-hidden;
}
</style>
