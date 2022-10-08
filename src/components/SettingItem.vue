<script setup>
import { defineProps, toRefs, reactive, provide } from "vue";
import { SettingItemKey } from "../tokens/settingItem";

const $props = defineProps({
  settingOption: {
    type: Object,
    required: true,
  },
});
provide(SettingItemKey, reactive({ ...toRefs($props) }));
</script>

<template>
  <div class="setting-item-container">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
</style>