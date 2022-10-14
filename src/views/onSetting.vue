<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import SettingItem from "../components/SettingItem.vue"
import SearchOption from "../components/SearchOption.vue"
import { searchOptions } from "../utils/searchOptions"

import { ref, computed } from "vue"
const isSearchOptionsShow = computed(() => (option) => {
	return option.type === "searchOption"
})

const categories = ref({
	searchOption: {
		id: "1",
		name: "搜索设置",
	},
	keyOption: {
		id: "2",
		name: "快捷键设置",
	},
	about: {
		id: "3",
		name: "关于",
	},
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
						:settingOption="option"
					>
						<search-option v-if="isSearchOptionsShow(option)" />
					</setting-item>
				</TabPanel>
				<TabPanel class="categoryPanel">Content 2</TabPanel>
				<TabPanel class="categoryPanel">
					<setting-item
						v-for="option in searchOptions"
						:key="option.id"
						:settingOption="option"
					>
						<search-option v-if="isSearchOptionsShow(option)" />
					</setting-item>
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
