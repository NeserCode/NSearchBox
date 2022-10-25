<script setup>
import SwitchItem from "./SwitchItem.vue"
import { ref, inject } from "vue"
import { SettingItemKey } from "../tokens/settingItem"

const { otherSettingOptions } = inject(SettingItemKey, undefined)
const bindLabel = ref(otherSettingOptions.label)
const bindDesc = ref(otherSettingOptions.desc)
const bindBound = ref(otherSettingOptions.bound)
</script>

<template>
	<div class="other-setting-item-main">
		<div class="item-body">
			<span class="text-area">
				<span class="item-label">{{ bindLabel }}</span>
				<span class="item-desc">{{ bindDesc }}</span>
			</span>
			<switch-item
				class="switch"
				:bound="bindBound"
				:settingLabel="bindLabel"
			/>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.other-setting-item-main {
	@apply inline-flex justify-center items-center w-full h-full;
}

.item-body {
	@apply inline-flex justify-between w-full px-4 py-2
	select-none;
}
.text-area {
	@apply inline-flex flex-col justify-center items-start;
}
.item-label {
	@apply text-base font-semibold;
}
.item-desc {
	@apply text-sm text-gray-400 dark:text-gray-500;
}
</style>
