<script setup>
import { ref, inject } from "vue";
import { SettingItemKey } from "../tokens/settingItem";

const { settingOption } = inject(SettingItemKey, undefined);
const bindTitle = ref(settingOption.title);
const bindPrefix = ref(settingOption.urlPrefix);
const bindPower = ref(settingOption.power);
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
  @apply inline-flex flex-col w-full h-full py-2;
}
.title-space,
.power-space {
  @apply inline-flex h-full;
}

.short-space {
  @apply py-1.5;
}

/* input style */
.inp {
  @apply bg-transparent border-b focus:border-blue-400
  text-center
  transition-all outline-none;
}
</style>