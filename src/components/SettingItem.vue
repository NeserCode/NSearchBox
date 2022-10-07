<script setup>
import { defineProps, toRefs } from "vue";

const $props = defineProps({
  settingOption: {
    type: Object,
    required: true,
  },
});
const { settingOption } = toRefs($props);
</script>

<template>
  <div class="setting-item-container">
    <span>Name {{ settingOption.title }}</span>
    <br />
    <span>prefix {{ settingOption.urlPrefix }}</span>
  </div>
</template>

<style lang="postcss" scoped>
</style>