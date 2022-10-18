<script setup>
import { Switch } from "@headlessui/vue"
import { defineProps, computed, ref, toRefs, onMounted } from "vue"

const enabled = ref(false)
const computedSwitchClass = computed(() => (bool) => {
	return bool ? "enabled" : null
})

const $props = defineProps({
	bound: {
		type: Boolean,
		required: true,
	},
})
const { bound } = toRefs($props)
onMounted(() => {
	enabled.value = bound.value
	console.log(bound.value)
})
</script>

<template>
	<Switch
		v-model="enabled"
		:class="['switch-body', computedSwitchClass(enabled)]"
	>
		<span class="sr-only">Use setting</span>
		<span
			aria-hidden="true"
			:class="[computedSwitchClass(enabled), 'switch-inner']"
		/>
	</Switch>
</template>

<style lang="postcss">
.switch-body {
	@apply relative inline-flex h-[24px] w-[46px] shrink-0
  cursor-pointer rounded-full border border-gray-200 dark:border-gray-500
	transition-colors duration-200 ease-in-out bg-teal-800 translate-x-0
  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75;
}

.switch-body.enabled {
	@apply bg-green-400;
}

.switch-inner {
	@apply pointer-events-none inline-block h-[22px] w-[22px] transform
  rounded-full bg-gray-200 dark:bg-gray-50 shadow-lg ring-0 transition duration-200 ease-in-out;
}

.switch-inner.enabled {
	@apply translate-x-[1.375rem];
}
</style>
