<script setup>
import { inject } from "vue"
import { SettingItemKey } from "../tokens/settingItem"

const { settingOption } = inject(SettingItemKey, undefined)
</script>

<template>
	<div class="about-item-main"></div>
</template>

<style lang="postcss" scoped></style>
