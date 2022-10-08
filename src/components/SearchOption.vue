<script setup>
import { onMounted, inject } from "vue";
import { SettingItemKey } from "../tokens/settingItem";

const { settingOption } = inject(SettingItemKey, undefined);
onMounted(() => {
  console.log(settingOption);
});
</script>

<template>
  <div class="search-option-main"></div>
</template>

<style lang="postcss" scoped>
</style>