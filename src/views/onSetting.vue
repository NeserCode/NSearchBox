<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import SettingItem from "../components/SettingItem.vue"
import SearchOption from "../components/SearchOption.vue"
import { searchOptions } from "../utils/searchOptions"
import AboutItem from "../components/AboutItem.vue"
import OtherSettingItem from "../components/OtherSettingItem.vue"
import { getConfig, saveConfig } from "../utils/getConfig"
import { $Bus } from "../utils/mitt"

import { ref, computed } from "vue"

const LOCAL_CONFIG = ref(getConfig())

const isSearchSettingOptionsShow = computed(() => (option) => {
	return option.type === "searchSettingOption"
})
const isOtherSettingOptionsShow = computed(() => (option) => {
	return option.type === "otherSettingOption"
})

const categories = ref({
	searchSettingOption: {
		id: "1",
		name: "搜索设置",
	},
	otherSettingOption: {
		id: "2",
		name: "其他设置",
	},
	about: {
		id: "3",
		name: "关于",
	},
})
const otherSettingOptions = ref([
	{
		id: 1,
		bound: LOCAL_CONFIG.value.enableHitokoto,
		label: "一言 Hiotoko",
		desc: "是否启用一言？",
		type: "otherSettingOption",
		settingName: "enableHitokoto",
	},
	{
		id: 2,
		bound: LOCAL_CONFIG.value.enableAlwaysOnTop,
		label: "窗口置顶",
		desc: "是否使本窗口置顶？",
		type: "otherSettingOption",
		settingName: "enableAlwaysOnTop",
	},
])

function getLabelIndex(data) {
	return otherSettingOptions.value.findIndex(
		(option) => option.label === data.key
	)
}

function getSettingName(index) {
	return otherSettingOptions.value[index].settingName
}

function reloadOptions() {
	LOCAL_CONFIG.value = getConfig()
	otherSettingOptions.value.forEach((option) => {
		option.bound = LOCAL_CONFIG.value[option.settingName]
	})
}

$Bus.on("update-config", (data) => {
	LOCAL_CONFIG.value[getSettingName(getLabelIndex(data))] = data.value
	saveConfig(LOCAL_CONFIG.value)
	reloadOptions()
})

const computedSelectedCategoryBtnClass = computed(() => (selected) => {
	return selected ? "actived" : null
})

// const computedSearchOptionsJson = JSON.stringify(searchOptions);
</script>

<template>
	<div class="setting-main">
		<TabGroup>
			<TabList class="categoryList">
				<Tab
					v-for="category in categories"
					as="template"
					:key="category.id"
					v-slot="{ selected }"
				>
					<button
						:class="['categoryBtn', computedSelectedCategoryBtnClass(selected)]"
					>
						{{ category.name ?? category }}
					</button>
				</Tab>
			</TabList>
			<TabPanels class="categoryPanels">
				<TabPanel class="categoryPanel">
					<setting-item
						v-for="option in searchOptions"
						:key="option.id"
						:searchSettingOption="option"
					>
						<search-option v-if="isSearchSettingOptionsShow(option)" />
					</setting-item>
				</TabPanel>
				<TabPanel class="categoryPanel">
					<setting-item
						v-for="option in otherSettingOptions"
						:key="option.id"
						:otherSettingOptions="option"
					>
						<other-setting-item v-if="isOtherSettingOptionsShow(option)" />
					</setting-item>
				</TabPanel>
				<TabPanel class="categoryPanel">
					<about-item></about-item>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</div>
</template>

<style lang="postcss" scoped>
.setting-main {
	@apply w-full p-2 mt-0.5 rounded px-8 pt-4
  bg-slate-50 border border-gray-300 dark:bg-slate-900 text-gray-700 dark:text-gray-300
  transition-all duration-300;
}

.tab-container {
	@apply w-full;
}

.categoryBtn {
	@apply w-full rounded-lg py-2.5 text-sm font-medium leading-5
  text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] hover:text-blue-400
  dark:hover:bg-slate-600 dark:hover:text-blue-400
  outline-none;
}
.categoryBtn.actived {
	@apply bg-white dark:bg-slate-800 shadow;
}

.categoryList {
	@apply flex p-1 space-x-1 rounded-xl
  bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
  outline-none;
}

.categoryPanels {
	@apply my-2;
}

.categoryPanel {
	@apply rounded-xl p-3
  bg-white dark:bg-gray-700
  outline-none;
}
</style>
