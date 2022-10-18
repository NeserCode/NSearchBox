<script setup>
import { defineProps, toRefs, reactive, provide } from "vue"
import { SettingItemKey } from "../tokens/settingItem"

const $props = defineProps({
	searchSettingOption: {
		type: Object,
	},
	otherSettingOptions: {
		type: Object,
	},
})
provide(SettingItemKey, reactive({ ...toRefs($props) }))
</script>

<template>
	<div class="setting-item-container">
		<slot />
	</div>
</template>

<style lang="postcss" scoped></style>
