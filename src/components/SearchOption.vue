<script setup>
import { ref, inject } from "vue"
import { SettingItemKey } from "../tokens/settingItem"

const { searchSettingOption } = inject(SettingItemKey, undefined)
const bindTitle = ref(searchSettingOption.title)
const bindPrefix = ref(searchSettingOption.urlPrefix)
const bindPower = ref(searchSettingOption.power)
</script>

<template>
	<div class="search-option-main">
		<div class="short-space">
			<div class="title-space">
				<span>📕 Title</span>
				<input type="text" class="inp" :value="bindTitle" readonly />
			</div>
			<div class="power-space">
				<span>💪 Power</span>
				<input type="text" class="inp" :value="bindPower" readonly />
			</div>
		</div>
		<div class="prefix-space">
			<span>🔗 Url Prefix</span>
			<input type="text" class="inp" :value="bindPrefix" readonly />
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.search-option-main {
	@apply inline-flex flex-col w-full h-full py-2 px-4;
}
.title-space,
.power-space {
	@apply inline-flex h-full;
}

.short-space {
	@apply inline-flex py-1.5;
}

/* input style */
.inp {
	@apply mx-2 h-full py-0.5
  bg-transparent border-b focus:border-blue-400
  transition-all outline-none;
}

.power-space .inp {
	@apply w-6 text-center;
}
.prefix-space .inp {
	@apply w-3/5 text-start;
}
</style>
