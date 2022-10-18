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
		<div class="item body">
			<span class="text-area">
				<span class="item-label">{{ bindLabel }}</span>
				<span class="item-desc">{{ bindDesc }}</span>
			</span>
			<switch-item :bound="bindBound" />
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
