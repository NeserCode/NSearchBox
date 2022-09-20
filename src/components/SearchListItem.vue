<script setup>
import { defineProps, toRefs } from "vue";

const $props = defineProps({
  item: {
    type: Array,
  },
});

const { item } = toRefs($props);
</script>

<template>
  <div class="search-list-item" v-for="i in item" :key="i.id">
    <span class="title">{{ i.title }}</span>
  </div>
</template>


<style>
</style>